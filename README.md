
# Kubernetes Homelab: Single-Repo ArgoCD with ApplicationSets

## ðŸŒŒ **About This Repo**

Welcome to my Kubernetes lab. This repository is the backbone of my homelab automation. It simplifies managing a bunch of Kubernetes apps using ArgoCD and ApplicationSets. No fluff, no overengineeringâ€”just a clean, organized approach to GitOps for my homelab adventures.

I built this to centralize everything: from media apps to network tools and system utilities. Itâ€™s all here, deployed automatically with a single source of truth.

---

## ðŸ› ï¸ **How It Works**

This setup has **three layers** to keep things structured:

### **1ï¸âƒ£ `apps/` - App Manifests**  
The foundation.  
- Each subfolder contains pure `.yaml` Kubernetes manifestsâ€”no Helm, no Kustomize, just YAML.  
- Categories help keep things tidy:  
  - `apps/media/` for media servers like Jellyfin.  
  - `apps/network/` for tools like Wireguard.  
  - `apps/system/` for utilities like cert-manager.  

---

### **2ï¸âƒ£ `appsets/` - ApplicationSets**  
The automation magic happens here.  
- A single `ApplicationSet` (`all-apps.yaml`) scans the `apps/` directory.  
- For every subfolder, an ArgoCD `Application` is created automatically.  
- Just drop a new app folder under `apps/`, and ArgoCD picks it up during the next sync.  

---

### **3ï¸âƒ£ `argocd/` - Bootstrap**  
The â€œall-in-oneâ€ option.  
- A single `app-of-apps.yaml` file references the `appsets/`.  
- Applying this to ArgoCD bootstraps **everything** at onceâ€”apps, system tools, and more.  

---

## ðŸŽ¯ **Why I Built This**

- **For My Homelab**: Managing Kubernetes apps manually was a pain. I needed a smarter, automated approach that could scale as my setup grew.  
- **GitOps-First**: Everything is version-controlled, so I know exactly whatâ€™s running and where.  
- **Flexibility**: New app? Just drop it into `apps/`. Want to scale? Add clusters or overlays without rewriting configs.  

---

## ðŸ“ **Folder Structure**

```
.
â”œâ”€â”€ apps/
â”‚   â”œâ”€â”€ media/
â”‚   â”‚   â”œâ”€â”€ jellyfin/
â”‚   â”‚   â”‚   â”œâ”€â”€ deployment.yaml
â”‚   â”‚   â”‚   â””â”€â”€ service.yaml
â”‚   â”‚   â””â”€â”€ ...
â”‚   â”œâ”€â”€ network/
â”‚   â”‚   â”œâ”€â”€ .wireguard/
â”‚   â”‚   â”‚   â”œâ”€â”€ deployment.yaml
â”‚   â”‚   â”‚   â””â”€â”€ service.yaml
â”‚   â”‚   â””â”€â”€ ...
â”‚   â”œâ”€â”€ system/
â”‚   â”‚   â”œâ”€â”€ cert-manager/
â”‚   â”‚   â”œâ”€â”€ external-dns/
â”‚   â”‚   â””â”€â”€ ...
â”œâ”€â”€ appsets/
â”‚   â””â”€â”€ all-apps.yaml              <-- ApplicationSet definition
â”œâ”€â”€ argocd/
â”‚   â””â”€â”€ app-of-apps.yaml           <-- Optional bootstrap app
â””â”€â”€ ...
```

---

## ðŸš€ **Getting Started**

1. **Install ArgoCD** on your Kubernetes cluster.  
2. **Apply `argocd/app-of-apps.yaml`** in ArgoCD to bootstrap everything:  
   - ArgoCD syncs with this repo.  
   - All apps in `apps/` are automatically deployed.  
3. **Add Apps** by creating a new subfolder under `apps/`.  
4. **Sync and Enjoy**: ArgoCD will pick up the changes, and the new app will be deployed automatically.

---

## ðŸŒ€ **Why ApplicationSets?**
- **Automatic Discovery**: Drop a folder, and itâ€™s liveâ€”no manual edits.  
- **Scalable**: Add clusters or environments with minimal tweaks.  
- **GitOps Nirvana**: Everything is clean, versioned, and easy to manage.  

---

## ðŸ¤˜ **Final Thoughts**

This setup keeps my homelab running smoothly without babysitting YAML files. Itâ€™s not just practicalâ€”itâ€™s satisfying to see everything deploy itself with zero hassle. If youâ€™re into Kubernetes labs, this approach might inspire you to level up your own.

Happy hacking!