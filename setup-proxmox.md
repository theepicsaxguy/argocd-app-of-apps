# Setup Proxmox
- Download ISO
- Add to vm
- start 

## Generate config

- talosctl gen secrets -o secrets.yaml
- talosctl gen config --with-secrets secrets.yaml kube https://api.kube.pc.tips.se:6443
- Edit values needed
- talosctl --talosconfig=./talosconfig config endpoint 10.25.150.11 10.25.150.12 10.25.150.13

- talosctl apply-config --insecure --nodes 10.25.150.11 --file controlplane.yaml
- talosctl bootstrap --nodes 10.25.150.11 

- talosctl apply-config --insecure --nodes 10.25.150.12 --file controlplane.yaml
- talosctl apply-config --insecure --nodes 10.25.150.13 --file controlplane.yaml

- talosctl kubeconfig --nodes 10.25.150.11 --endpoints 10.25.150.11 --talosconfig=./talosconfig

- boot up workers
- talosctl apply-config --insecure \--nodes 10.25.150.14 --file worker.yaml

- kubectl get nodes

- talosctl --nodes 10.25.150.11 --endpoints 10.25.150.11 health --talosconfig=./talosconfig

- talosctl apply-config --insecure --nodes 10.25.150.14 --file worker.yaml
- talosctl apply-config --insecure --nodes 10.25.150.15 --file worker.yaml
- talosctl apply-config --insecure --nodes 10.25.150.16 --file worker.yaml

- kubectl apply -k github.com/theepicsaxguy/argocd-app-of-apps/ops/argocd



talosctl apply-config --nodes 10.25.150.13 --file controlplane.yaml