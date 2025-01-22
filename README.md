# Single-Repo ArgoCD with ApplicationSets

## Overview
This repository organizes Kubernetes manifests using three levels:

1. **Level 1: `apps/`**  
   - Each subfolder has pure `.yaml` manifests. No Helm or Kustomize.  
   - Example folders: `apps/media/jellyfin`, `apps/network/.wireguard`, etc.  

2. **Level 2: `appsets/`**  
   - Contains an `ApplicationSet` definition (`all-apps.yaml`) that scans `apps/*/*` and generates an Argo CD `Application` for each subfolder.  
   - The resulting Argo CD apps deploy each set of manifests automatically.

3. **Level 3: `argocd/`**  
   - Contains an optional “app-of-apps.yaml” that references the `appsets/` folder.  
   - Apply `app-of-apps.yaml` in Argo CD to bootstrap the entire repository in one go.

## Usage

1. **Install Argo CD** on your cluster.  
2. **Add a top-level Argo CD Application** that points to `argocd/app-of-apps.yaml`:
    ```yaml
    apiVersion: argoproj.io/v1alpha1
    kind: Application
    metadata:
      name: bootstrap
      namespace: argocd
    spec:
      source:
        repoURL: 'https://github.com/theepicsaxguy/argocd-app-of-apps.git'
        targetRevision: main
        path: argocd
        directory:
          recurse: true
      destination:
        server: https://kubernetes.default.svc
        namespace: argocd
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
    ```
3. **Add new apps** by creating a subfolder under the relevant category (e.g., `apps/system/my-new-app`). Place `.yaml` manifests there. The ApplicationSet automatically detects it on the next sync.
4. **Optional**: If you don’t want the “app-of-apps” approach, directly apply `appsets/all-apps.yaml` to Argo CD. Then Argo CD will manage everything from that single `ApplicationSet`.

## Example Folder Layout

apps/ media/ jellyfin/ deployment.yaml service.yaml network/ .wireguard/ deployment.yaml service.yaml ... appsets/ all-apps.yaml argocd/ app-of-apps.yaml namespaces/ ...

sql
Kopiera

## Why ApplicationSets?
- **Automatic Discovery**: No need to edit aggregator files when new apps/folders are added.  
- **Scalability**: If you add more clusters or environment overlays, you can expand the generator logic without rewriting everything.

Enjoy simpler GitOps with Argo CD + ApplicationSets!

.
├── apps/
│   ├── media/
│   │   ├── jellyfin/
│   │   │   ├── deployment.yaml
│   │   │   └── service.yaml
│   │   └── ...
│   ├── network/
│   │   ├── .wireguard/
│   │   │   ├── deployment.yaml
│   │   │   └── service.yaml
│   │   └── ...
│   ├── platform/
│   │   ├── external-secrets/
│   │   ├── grafana/
│   │   ├── renovate/
│   │   └── ...
│   ├── system/
│   │   ├── cert-manager/
│   │   ├── cloudflared/
│   │   ├── external-dns/
│   │   ├── scheduler/
│   │   └── ...
│   ├── webserver/
│   │   └── nginx/
│   │       ├── deployment.yaml
│   │       └── service.yaml
│   └── databases/
│       └── ...
├── appsets/
│   └── all-apps.yaml              <-- New ApplicationSet definition
├── argocd/
│   └── app-of-apps.yaml           <-- Optional “umbrella” application
├── namespaces/                    <-- (If you keep these around)
└── ...
