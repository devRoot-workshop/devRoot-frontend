function install {
    Write-Output "Installing project dependencies..."
    npm install
}

function run_dev {
    Write-Output "Starting frontend application in development mode!"
    npm run dev
}

function run_prod {
    Write-Output "Starting frontend application in production mode!"
    npm run start
}

function build {
    Write-Output "Building the nextjs application..."
	npm run build
}

function dockr {
	Write-Output "Building the nextjs application into a docker container..."
	docker build -t devroot-frontend:latest .
	Write-Output "Running built docker container..."
	docker run -d -p 3000:3000 --name devroot-frontend devroot-frontend:latest
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

            "build" {
                build
            }

            "run_dev" {
                run_dev
            }

            "run_prod" {
                run_prod
            }

            "docker" {
                dockr
            }

            Default {
                Write-Host "Unkown paramter: $($parameter)"
            }
        }
    }
}