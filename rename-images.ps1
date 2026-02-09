$files = @(
    "project-ecommerce-uk",
    "project-umrah-travel",
    "project-courses-management",
    "project-ecommerce-usa",
    "project-skincare",
    "project-dental-clinic",
    "project-khussa",
    "project-school-management",
    "project-recharge-system",
    "project-printing-management",
    "project-ai-job-analyzer",
    "project-lead-gen-pro"
)

foreach ($file in $files) {
    $oldPath = ".\assets\images\$file.jpg"
    $newPath = ".\assets\images\$file.svg"
    if (Test-Path $oldPath) {
        Rename-Item -Path $oldPath -NewName "$file.svg"
        Write-Host "Renamed: $file.jpg -> $file.svg"
    }
}
