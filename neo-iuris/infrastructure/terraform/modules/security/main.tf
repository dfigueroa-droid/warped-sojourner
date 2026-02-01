# Infrastructure Hardening: Security Group Definition

resource "aws_security_group" "fortified_sg" {
  name        = "neo-iuris-fortified-sg"
  description = "Security Group with 'Deny-All' default mentality"
  vpc_id      = var.vpc_id

  # Ingress: Allow ONLY internal traffic from Control Plane (Simulation)
  ingress {
    description = "Allow TLS from Internal Control Plane"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [var.internal_vpc_cidr]
  }

  # Egress: Restricted outbound for updates only
  egress {
    description = "Allow HTTPS outbound for API Probing"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Hardening: Remove default unrestricted egress if present in module defaults
  tags = {
    Name       = "neo-iuris-fortified-sg"
    Compliance = "HIPAA-Tier-1"
  }
}
