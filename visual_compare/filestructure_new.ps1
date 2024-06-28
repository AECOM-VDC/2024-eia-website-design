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
    
    # Sort the keys (folder names) alphanumerically
    $sortedKeys = $folderStructure.Keys | Sort-Object
    
    $sortedFolderStructure = @()
    
    foreach ($key in $sortedKeys) {
        # Get and sort the files in the specified order
        $sortedFiles = $folderStructure[$key] | Sort-Object -Property @{
            Expression = {$_ -match "existing"}
            Descending = $true
        }, @{
            Expression = {$_ -match "without"}
            Descending = $true
        }, @{
            Expression = {$_ -match "day"}
            Descending = $true
        }, @{
            Expression = {$_ -match "year|10years"}
            Descending = $false
        }
        
        # Create a custom object for each sorted folder
        $sortedFolderStructure += [PSCustomObject]@{
            Key = $key
            Value = $sortedFiles
        }
    }
    
    # Convert the folder structure to JSON and output to a file
    $json = $sortedFolderStructure | ConvertTo-Json -Depth 10
    $jsonFilePath = Join-Path -Path $Path -ChildPath "folder_structure.json"
    $json | Out-File -FilePath $jsonFilePath -Encoding UTF8
}
# Path to _webframe\asset\visual_impact
Get-FolderStructure -Path ".\asset\visual_impact"
# Add this line to prevent the window from closing immediately
Read-Host -Prompt "Press Enter to exit"