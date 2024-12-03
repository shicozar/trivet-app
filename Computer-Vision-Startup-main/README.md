
# Computer Vision Web Application

## Overview
This project is a web application that leverages computer vision techniques to perform various tasks. It is built using Docker, with continuous integration and deployment (CI/CD) pipelines set up to automate the build and deployment processes.

## Features
- User-friendly interface for computer vision tasks.
- Dockerized application for easy deployment.
- CI/CD pipelines for automated testing and deployment.
- Elastic IP setup for a consistent public URL.

## Tech Stack
- **Frontend:** React.js
- **Containerization:** Docker
- **Cloud Provider:** AWS EC2
- **CI/CD:** GitHub Actions

## Getting Started

### Prerequisites
- Docker installed on your local machine.
- An AWS account for deploying the application.

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/himanshudangwal/computer-vision.git
   cd computer-vision
   ```

2. **Build the Docker image:**
   ```bash
   docker build -t computer-vision:latest .
   ```

3. **Run the Docker container:**
   ```bash
   docker run -d -p 5173:5173 computer-vision:latest
   ```

4. **Access the application:**
   Open your browser and go to `http://localhost:5173`.

## CI/CD Pipeline
The CI/CD pipelines are set up using GitHub Actions to automate the build and deployment processes. 

### CI Pipeline
The CI pipeline builds the Docker image and pushes it to Docker Hub on every push to the `main` branch.

```yaml
name: CI

on:
  push:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - name: Login to Dockerhub
        env:
          DOCKER_USERNAME: ${{ secrets.DOCKER_USERNAME }}
          DOCKER_PASSWORD: ${{ secrets.DOCKER_PASSWORD }}
        run: |
          echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
      - name: Build the Docker image
        run: docker build -t himanshudangwal/computer-vision:latest .
      - name: Push image to Docker Hub
        run: docker push himanshudangwal/computer-vision:latest
```

### CD Pipeline
The CD pipeline deploys the application to an EC2 instance whenever the CI pipeline is completed.

```yaml
name: Deploy

on:
  workflow_run:
    workflows: ['CI']
    types: [completed]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Deploy to EC2
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SSH_HOST }}          # Your EC2 public IP or hostname in GitHub secrets
          username: ${{ secrets.SSH_USERNAME }}  # Your EC2 instance's SSH username (e.g., ec2-user, ubuntu)
          key: ${{ secrets.SSH_KEY }}            # Your SSH private key (in GitHub secrets)
          script: |
            sudo docker pull himanshudangwal/computer-vision:latest
            sudo docker stop computer-vision || true
            sudo docker rm computer-vision || true
            sudo docker run -d --name computer-vision -p 80:5173 himanshudangwal/computer-vision:latest
```

## Elastic IP Setup for Consistent URL

### Issue: IP Address Changes on Reboot
Whenever you stop or reboot your EC2 instance, the public IP address assigned to that instance changes. This can cause issues, especially if you have shared the URL with users or integrated it into applications.

### Solution: Elastic IP
To ensure a constant public IP address that remains the same even after stopping or rebooting the EC2 instance, I utilized **Elastic IP**.

### Steps to Allocate and Associate an Elastic IP:
1. **Access the EC2 Dashboard:**
   - Log in to your AWS Management Console.
   - Navigate to the **EC2** service.

2. **Go to the Elastic IP section:**
   - In the left navigation pane, find and click on **Elastic IPs**.

3. **Allocate a New Elastic IP Address:**
   - Click on the **Allocate Elastic IP address** button.
   - Confirm the allocation by clicking **Allocate** on the dialog box.

4. **Associate the Elastic IP with Your EC2 Instance:**
   - Select the newly allocated Elastic IP from the list.
   - Click on the **Actions** dropdown menu and select **Associate Elastic IP address**.
   - Choose the EC2 instance to associate it with, and confirm the action.

### Fees:
- **Elastic IPs** are free when associated with a running instance. However, if you allocate an Elastic IP but do not associate it with a running instance, AWS will charge a small hourly fee.

## Conclusion
By implementing this project, I have created a robust computer vision application with automated deployment processes and a consistent URL for end users. The use of Docker, CI/CD pipelines, and Elastic IPs ensures a smooth development and operational-experience.
