function install {
    Write-Output "Installing project dependencies..."
    npm install
}

function run {
    Write-Output "Starting frontend application in development mode!"
    npm run dev
}


if ($args.Count -eq 0) {
    Write-Output "No parameters provided. Usage:"
    Write-Output ".\setup.ps1 [install] [run]"
} else {
    foreach ($parameter in $args) {
        switch ($parameter) {
            "install" { 
                install
            }

            "run" {
                run
            }

            Default {
                Write-Host "Unkown paramter: $($parameter)"
            }
        }
    }
}