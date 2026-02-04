#!/bin/bash
# Script để chạy server với phiên bản Node.js portable đã tải về
# Sử dụng: ./run_dev.sh

# Đường dẫn đến Node.js portable
NODE_DIR="./node-v20.11.0-darwin-arm64/bin"

# Thêm vào PATH
export PATH="$PWD/$NODE_DIR:$PATH"

# Kiểm tra node
echo "Using Node version: $(node -v)"
echo "Using NPM version: $(npm -v)"

# Chạy server
npm run dev
