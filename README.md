# shop-cart — Demo CI/CD với GitHub Actions + Jest

Project nhỏ (Node.js) dùng để demo pipeline **CI/CD đơn giản**: mỗi lần `git push`, **GitHub Actions tự động chạy unit test** bằng Jest. Đây là sản phẩm bài 3.

## Cấu trúc project

```
shop-cart/
├── .github/
│   └── workflows/
│       └── ci.yml          <- pipeline CI (định nghĩa các bước chạy)
├── src/
│   └── cart.js             <- code: class giỏ hàng
├── tests/
│   └── cart.test.js        <- 11 unit test viết bằng Jest
├── .gitignore              <- loại node_modules/coverage khỏi repo
├── package.json
└── README.md
```

## Pipeline CI làm gì?

Pipeline nằm trong `.github/workflows/ci.yml`, kích hoạt khi có `push` vào nhánh `main` hoặc có `pull request`:

| Bước | Việc làm | Ý nghĩa |
|---|---|---|
| 1. Checkout code | `actions/checkout@v4` | Lấy mã nguồn về máy ảo (runner) của GitHub |
| 2. Setup Node.js | `actions/setup-node@v4` | Cài Node.js 20 trên runner |
| 3. Install dependencies | `npm install` | Cài Jest và thư viện |
| 4. Run unit tests | `npm test` (jest --coverage) | **Chạy toàn bộ unit test tự động** — nếu 1 test fail → pipeline ĐỎ; tất cả pass → pipeline XANH |

→ Nhờ vậy, code hỏng bị phát hiện ngay khi push, không đợi đến lúc build/kiểm thử thủ công.

## Chạy test trên máy (đã chạy xanh trước khi nộp)

```powershell
cd shop-cart
npm install
npm test
```

## HƯỚNG DẪN ĐƯA LÊN GITHUB (tự làm bằng tài khoản của bạn — không cần token cho ai khác)

Máy này **chưa cài Git**, nên có 2 cách:

### Cách 1 — GitHub Desktop (dễ nhất, khuyến nghị)

1. Tải + cài **GitHub Desktop**: https://desktop.github.com
2. Mở app → **Sign in to GitHub.com** → đăng nhập bằng tài khoản GitHub của bạn (qua trình duyệt)
3. **File → Add local repository...** → chọn thư mục `shop-cart` này
4. App báo chưa phải repo → bấm **create a repository** → đặt tên `shop-cart-ci-demo` → **Create Repository**
5. Bấm **Publish repository** (muốn để Public thì bỏ tick "Keep this code private") → code lên GitHub kèm pipeline
6. Mở repo trên web → tab **Actions** → xem pipeline chạy lần đầu (vàng → xanh)
7. Thử phá 1 test (ví dụ đổi `toBe(600000)` thành `toBe(500000)`) → GitHub Desktop: viết message commit → **Commit to main** → **Push origin** → vào tab Actions thấy pipeline **ĐỎ** → sửa lại đúng → push lại → **XANH**. Quay video luôn đoạn này!

### Cách 2 — Dùng Git dòng lệnh (nếu cài Git for Windows từ https://git-scm.com)

```powershell
cd C:\Users\Voi\Desktop\KiemThu\03-ci-cd\shop-cart
git init
git add .
git commit -m "Them project shop-cart voi pipeline CI GitHub Actions"
git branch -M main
# Tao repo rong ten shop-cart-ci-demo tren github.com (khong tick README)
git remote add origin https://github.com/<ten-tai-khoan-cua-ban>/shop-cart-ci-demo.git
git push -u origin main
```

Lần đầu push, **Git Credential Manager** sẽ bật cửa sổ đăng nhập GitHub trên trình duyệt — đăng nhập tài khoản của bạn là push được (không cần PAT thủ công).

## Quay video demo (để nộp)

1. Bấm **Win + G** (Xbox Game Bar) → nút ghi → **Win + Alt + R** để bắt đầu/dừng ghi (hoặc dùng OBS)
2. Nội dung nên có trong video (~2–3 phút):
   - Mở repo trên GitHub, giới thiệu cấu trúc code + file `ci.yml`
   - Mở tab **Actions**, mở 1 lần chạy pipeline: thấy 4 bước chạy lần lượt, kết quả **xanh**, mở log bước "Run unit tests" thấy 11 test passed + bảng coverage
   - Push 1 commit làm hỏng test → vào Actions thấy pipeline **đỏ** ngay tại commit đó
   - Sửa lại → push → pipeline **xanh** trở lại
   - Kết luận: pipeline tự chạy unit test mỗi lần push đúng yêu cầu đề bài

## Badge CI (tùy chọn, trang trí README trên GitHub)

Sau khi push, thêm dòng này vào đầu README (thay `<user>`/`<repo>`):

```markdown
[![CI](https://github.com/<user>/<repo>/actions/workflows/ci.yml/badge.svg)](https://github.com/<user>/<repo>/actions/workflows/ci.yml)
```
