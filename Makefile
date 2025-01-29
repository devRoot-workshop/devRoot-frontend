install:
	@echo "Installing all the dependencies for the nextjs application..."
	@sudo npm install

build:
	@echo "Building the nextjs application..."
	@sudo npm run build

run_dev:
	@echo "Running the nextjs application in development mode..."
	@sudo npm run dev

run_prod:
	@echo "Running the nextjs application in production mode..."
	@sudo npm run start

docker:
	@echo "Building the nextjs application into a docker container..."
	@sudo docker build -t devroot-frontend:latest .
	@echo "Running built docker container..."
	@sudo docker run -d -p 3000:3000 --name devroot-frontend devroot-frontend:latest
