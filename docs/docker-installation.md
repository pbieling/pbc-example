# Setting up a Demo Project with Docker

This guide describes the installation of a development environment that is not intended for secure production use.

A `Dockerfile` and a `docker-compose.yml` are provided, which you can adapt to your needs.

## Installation Steps

1. Create a folder for the Docker project, e.g., `pbc-docker-project`.
2. Install Composer and npm on your system, if not already installed.
3. Run the following command:
   ```bash
   composer create-project pbieling/pbc-example pbc-example --stability dev
   ```
4. Install the JavaScript packages using npm:
   ```bash
   cd pbc-example/htdocs/3rd
   npm install
   ```
5. Copy the `Dockerfile` and `docker-compose.yml` files from the `documentation/docker-example` directory into the root folder `pbc-docker-project` and navigate to that directory.
6. Build the Docker image using the command:
   ```bash
   docker build -t pbc-example-docker:1 -f ./Dockerfile .
   ```
7. Start the containers for Web, MySQL, and phpMyAdmin:
   ```bash
   docker compose up -d
   ```
8. Open the `pbc-example` application in your browser at <http://localhost:8888> (User: `admin`, Password: `admin`).
9. Open **phpMyAdmin** at <http://localhost:8080> (User: `root`, Password: `password`).

## Final Notes on the Installation Process

During the installation via `docker-compose.yml`, the database dump is automatically imported.  
The test database credentials are already configured for the Docker installation, so no further adjustments are necessary to get started.

For custom extensions, the `entrypoint.sh` and `bootstrap.php` files are located in the `pbc-example` folder. The latter is called by the shell script, is currently empty, and can be populated with code if needed (e.g., to check application prerequisites).

---

[Back to README](../README.md)


