provider "aws" {
  region = "us-east-1"
}

# 1. VPC (Network Isolation)
resource "aws_vpc" "neo_vpc" {
  cidr_block = "10.0.0.0/16"
  tags       = { Name = "Neo-Iuris-VPC" }
}

# 2. EC2 Instance (Hosting the Docker Container)
resource "aws_instance" "neo_server" {
  ami           = "ami-0c55b159cbfafe1f0" # Ubuntu 20.04 Tier
  instance_type = "t3.medium"

  tags = {
    Name = "Neo-Iuris-Core-Node"
    Role = "Legal-AI-Server"
  }

  user_data = <<-EOF
              #!/bin/bash
              apt-get update
              apt-get install -y docker.io docker-compose
              git clone https://github.com/dfigueroa/neo-iuris.git
              cd neo-iuris
              docker-compose up -d
              EOF
}

# 3. Security Group (Firewall)
resource "aws_security_group" "allow_web" {
  name        = "allow_web_traffic"
  description = "Allow HTTP/HTTPS traffic"
  vpc_id      = aws_vpc.neo_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
