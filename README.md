# Quick Start

To install all the required dependencies run:

```sh
make install
```

or on windows:

```bat
.\setup.ps1 install
```

To build and run the application in development mode:

```sh
make run_dev
```

or on windows:

```bat
.\setup.ps1 run_dev
```

And for production mode run:

```sh
make build run_prod
```

or on windows:

```bat
.\setup.ps1 build run_prod
```

These commands will run the frontend (and build it for production).

To build into a docker container run:

```sh
make docker
```

On windows:

```bat
.\setup.ps1 docker
```

## Available Targets

- `install`: Installs all the dependencies required by the application
- `build`: Builds the nextjs application
- `run_dev`: Runs the application in development mode
- `run_prod`: Runs the application in production mode
- `docker`: Builds and runs the docker container