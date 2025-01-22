
# Kubernetes Homelab: Single-Repo ArgoCD with ApplicationSets

## 🌌 **About This Repo**

Welcome to my Kubernetes lab. This repository is the backbone of my homelab automation. It simplifies managing a bunch of Kubernetes apps using ArgoCD and ApplicationSets. No fluff, no overengineering—just a clean, organized approach to GitOps for my homelab adventures.

I built this to centralize everything: from media apps to network tools and system utilities. It’s all here, deployed automatically with a single source of truth.

---

## 🛠️ **How It Works**

This setup has **three layers** to keep things structured:

### **1️⃣ `apps/` - App Manifests**  
The foundation.  
- Each subfolder contains pure `.yaml` Kubernetes manifests—no Helm, no Kustomize, just YAML.  
- Categories help keep things tidy:  
  - `apps/media/` for media servers like Jellyfin.  
  - `apps/network/` for tools like Wireguard.  
  - `apps/system/` for utilities like cert-manager.  

---

### **2️⃣ `appsets/` - ApplicationSets**  
The automation magic happens here.  
- A single `ApplicationSet` (`all-apps.yaml`) scans the `apps/` directory.  
- For every subfolder, an ArgoCD `Application` is created automatically.  
- Just drop a new app folder under `apps/`, and ArgoCD picks it up during the next sync.  

---

### **3️⃣ `argocd/` - Bootstrap**  
The “all-in-one” option.  
- A single `app-of-apps.yaml` file references the `appsets/`.  
- Applying this to ArgoCD bootstraps **everything** at once—apps, system tools, and more.  

---

## 🎯 **Why I Built This**

- **For My Homelab**: Managing Kubernetes apps manually was a pain. I needed a smarter, automated approach that could scale as my setup grew.  
- **GitOps-First**: Everything is version-controlled, so I know exactly what’s running and where.  
- **Flexibility**: New app? Just drop it into `apps/`. Want to scale? Add clusters or overlays without rewriting configs.  

---

## 📁 **Folder Structure**

```
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
│   ├── system/
│   │   ├── cert-manager/
│   │   ├── external-dns/
│   │   └── ...
├── appsets/
│   └── all-apps.yaml              <-- ApplicationSet definition
├── argocd/
│   └── app-of-apps.yaml           <-- Optional bootstrap app
└── ...
```

---

## 🚀 **Getting Started**

1. **Install ArgoCD** on your Kubernetes cluster.  
2. **Apply `argocd/app-of-apps.yaml`** in ArgoCD to bootstrap everything:  
   - ArgoCD syncs with this repo.  
   - All apps in `apps/` are automatically deployed.  
3. **Add Apps** by creating a new subfolder under `apps/`.  
4. **Sync and Enjoy**: ArgoCD will pick up the changes, and the new app will be deployed automatically.

---

## 🌀 **Why ApplicationSets?**
- **Automatic Discovery**: Drop a folder, and it’s live—no manual edits.  
- **Scalable**: Add clusters or environments with minimal tweaks.  
- **GitOps Nirvana**: Everything is clean, versioned, and easy to manage.  

---

## 🤘 **Final Thoughts**

This setup keeps my homelab running smoothly without babysitting YAML files. It’s not just practical—it’s satisfying to see everything deploy itself with zero hassle. If you’re into Kubernetes labs, this approach might inspire you to level up your own.

Happy hacking!
