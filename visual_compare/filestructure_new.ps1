function Get-FolderStructure {
    param(
        [Parameter(Mandatory=$true)]
        [String]$Path
    )
    
    $folderStructure = @{}
    
    function Explore-Folders {
        param(
            [Parameter(Mandatory=$true)]
            [String]$FolderPath
        )
        
        $folderName = (Get-Item -Path $FolderPath).Name
        $files = Get-ChildItem -Path $FolderPath -File | Select-Object -ExpandProperty Name
        $folderStructure[$folderName] = $files
        
        $subfolders = Get-ChildItem -Path $FolderPath -Directory
        
        foreach ($subfolder in $subfolders) {
            Explore-Folders -FolderPath $subfolder.FullName
        }
    }
    
    Explore-Folders -FolderPath $Path
    
    $sortedKeys = $folderStructure.Keys | Sort-Object
    
    $sortedFolderStructure = @()
    
    foreach ($key in $sortedKeys) {
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
        
        $sortedFolderStructure += [PSCustomObject]@{
            Key = $key
            Value = $sortedFiles
        }
    }
    
    # New step: Convert the sorted structure to the desired format
    $finalStructure = @{}
    foreach ($folder in $sortedFolderStructure) {
        $finalStructure[$folder.Key] = $folder.Value
    }
    
    $json = $finalStructure | ConvertTo-Json -Depth 10
    $jsonFilePath = Join-Path -Path $Path -ChildPath "folder_structure.json"
    $json | Out-File -FilePath $jsonFilePath -Encoding UTF8
}

Get-FolderStructure -Path ".\asset\visual_impact"
Read-Host -Prompt "Press Enter to exit"