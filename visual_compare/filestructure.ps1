function Get-FolderStructure {
    param(
        [Parameter(Mandatory=$true)]
        [String]$Path
    )
    
    # Create a hashtable to store the folder structure and file names
    $folderStructure = @{}
    
    # Function to recursively explore directories
    function Explore-Folders {
        param(
            [Parameter(Mandatory=$true)]
            [String]$FolderPath
        )
        
        # Get the current folder name
        $folderName = (Get-Item -Path $FolderPath).Name
        
        # Get all files in the current folder
        $files = Get-ChildItem -Path $FolderPath -File | Select-Object -ExpandProperty Name
        
        # Add the files to the folder structure hashtable
        $folderStructure[$folderName] = $files
        
        # Get all subfolders
        $subfolders = Get-ChildItem -Path $FolderPath -Directory
        
        # Recursively explore each subfolder
        foreach ($subfolder in $subfolders) {
            Explore-Folders -FolderPath $subfolder.FullName
        }
    }
    
    # Start exploring from the provided path
    Explore-Folders -FolderPath $Path
    
    # Sort the key by name, ascending
    $folderStructure = $folderStructure.GetEnumerator() | Sort-Object -Property Key

    # Sort the values by following rules
    # if the value contains "existing" in string. Sort to first
    # if the value contains"without" in string. Sort to second
    # if the value contains "day". Sort to third
    # if the value contains "year" or "10years". Sort to the last
    # if the value does not fall into any rules above, sort to first
    $folderStructure = $folderStructure | ForEach-Object {
        $key = $_.Key
        $value = $_.Value
        $value = $value | Sort-Object -CaseSensitive -Descending -Property @{Expression={$_ -match "existing|e"}},@{Expression={$_ -match "without"}},@{Expression={$_ -match "day"}},@{Expression={$_ -match "year|10years|y"}},@{Expression={$_ -notmatch "existing|without|day|year|10years"}}
        [PSCustomObject]@{
            Key = $key
            Value = $value
        }
    }
 





    # Convert the hashtable to JSON and output to a file
    $json = $folderStructure | ConvertTo-Json -Depth 10
    $jsonFilePath = Join-Path -Path $Path -ChildPath "folder_structure.json"
    $json | Out-File -FilePath $jsonFilePath
}

# Path to _webframe\asset\visual_impact
Get-FolderStructure -Path ".\asset\visual_impact"

# Add this line to prevent the window from closing immediately
Read-Host -Prompt "Press Enter to exit"