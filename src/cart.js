// Bai 3 - Class gio hang don gian, dung lam doi tuong unit test trong pipeline CI/CD
class Cart {
  constructor() {
    this.items = [];
  }

  // Them san pham; neu da co thi tang so luong
  addItem(name, price, quantity = 1) {
    if (typeof price !== "number" || price < 0) {
      throw new Error("Gia khong hop le");
    }
    if (quantity < 1) {
      throw new Error("So luong khong hop le");
    }
    const existing = this.items.find((i) => i.name === name);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ name, price, quantity });
    }
    return this.items;
  }

  // Xoa san pham; tra ve true neu xoa duoc, false neu khong tim thay
  removeItem(name) {
    const before = this.items.length;
    this.items = this.items.filter((i) => i.name !== name);
    return this.items.length !== before;
  }

  // Tong tien gio hang
  getTotal() {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  // Ap dung ma giam gia theo phan tram
  applyDiscount(percent) {
    if (percent < 0 || percent > 100) {
      throw new Error("Phan tram giam gia khong hop le");
    }
    return Math.round(this.getTotal() * (1 - percent / 100));
  }
}

module.exports = Cart;
