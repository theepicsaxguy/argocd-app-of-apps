# Argo CD Template Repository

This repository serves as a template for managing Kubernetes deployments using Argo CD and Kustomize.

## Structure

- `environments/`: Contains application manifests organized by environment.
- `argo-cd/`: Contains Argo CD configurations for applications and projects.

## Usage

1. Update the repository with your application details.
2. Deploy Argo CD configurations:
   ```bash
   kubectl apply -f argo-cd/
   ```
3. Sync applications via Argo CD UI or CLI:
   ```bash
   argocd app sync app1
   ```
4. Automate updates with Renovate.
