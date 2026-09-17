// Bai 3 - Unit test cho Cart (Jest) - chay tu dong trong GitHub Actions
const Cart = require("../src/cart");

describe("Cart.addItem", () => {
  test("them san pham moi vao gio", () => {
    const cart = new Cart();
    cart.addItem("Balo", 250000, 1);
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0]).toEqual({ name: "Balo", price: 250000, quantity: 1 });
  });

  test("them san pham da co thi tang so luong", () => {
    const cart = new Cart();
    cart.addItem("Balo", 250000, 1);
    cart.addItem("Balo", 250000, 2);
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].quantity).toBe(3);
  });

  test("gia am thi nem loi", () => {
    const cart = new Cart();
    expect(() => cart.addItem("Balo", -1000)).toThrow("Gia khong hop le");
  });

  test("gia khong phai so thi nem loi", () => {
    const cart = new Cart();
    expect(() => cart.addItem("Balo", "hai tra")).toThrow("Gia khong hop le");
  });

  test("so luong < 1 thi nem loi", () => {
    const cart = new Cart();
    expect(() => cart.addItem("Balo", 250000, 0)).toThrow("So luong khong hop le");
  });
});

describe("Cart.removeItem", () => {
  test("xoa san pham ton tai tra ve true", () => {
    const cart = new Cart();
    cart.addItem("Balo", 250000);
    expect(cart.removeItem("Balo")).toBe(true);
    expect(cart.items).toHaveLength(0);
  });

  test("xoa san pham khong ton tai tra ve false", () => {
    const cart = new Cart();
    expect(cart.removeItem("Ao")).toBe(false);
  });
});

describe("Cart.getTotal", () => {
  test("tong tien = gia x so luong cua tung san pham", () => {
    const cart = new Cart();
    cart.addItem("Balo", 250000, 2);
    cart.addItem("Ao", 100000, 1);
    expect(cart.getTotal()).toBe(600000);
  });
});

describe("Cart.applyDiscount", () => {
  test("giam 10% tong 600000 con 540000", () => {
    const cart = new Cart();
    cart.addItem("Balo", 250000, 2);
    cart.addItem("Ao", 100000, 1);
    expect(cart.applyDiscount(10)).toBe(540000);
  });

  test("phan tram am thi nem loi", () => {
    const cart = new Cart();
    expect(() => cart.applyDiscount(-5)).toThrow("Phan tram giam gia khong hop le");
  });

  test("phan tram > 100 thi nem loi", () => {
    const cart = new Cart();
    expect(() => cart.applyDiscount(150)).toThrow("Phan tram giam gia khong hop le");
  });
});
