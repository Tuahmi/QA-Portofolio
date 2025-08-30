describe("Fitur Login OrangHRM", () => {
  const url =
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

  beforeEach(() => {
    cy.visit(url);
  });

  it("TC_001 - Login dengan data valid", () => {
    cy.intercept("POST", "**/auth/validate*").as("loginRequest");

    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest");

    cy.url().should("include", "/dashboard");
    cy.get(".oxd-topbar-header-breadcrumb").should("contain", "Dashboard");
  });

  it("TC_002 - Login gagal dengan username salah", () => {
    cy.intercept("POST", "**/auth/validate*").as("loginRequest");

    cy.get('input[name="username"]').type("User");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest");

    cy.get(".oxd-alert-content").should("contain", "Invalid credentials");
  });

  it("TC_003 - Login gagal dengan password salah", () => {
    cy.intercept("POST", "**/auth/validate*").as("loginRequest");

    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("User123");
    cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest");

    cy.get(".oxd-alert-content").should("contain", "Invalid credentials");
  });

  it("TC_004 - Login gagal dengan username kosong", () => {
    cy.intercept("POST", "**/auth/validate*").as("loginRequest");

    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();

    cy.get(".oxd-input-group__message").should("contain", "Required");
  });

  it("TC_005 - Login gagal dengan password kosong", () => {
    cy.intercept("POST", "**/auth/validate*").as("loginRequest");

    cy.get('input[name="username"]').type("Admin");
    cy.get('button[type="submit"]').click();

    cy.get(".oxd-input-group__message").should("contain", "Required");
  });

  it("TC_006 - Login gagal dengan username dan password kosong", () => {
    cy.intercept("POST", "**/auth/validate*").as("loginRequest");

    cy.get('button[type="submit"]').click();

    cy.get(".oxd-input-group__message").should("contain", "Required");
  });

  it("TC_007 - Logout berhasil", () => {
    cy.intercept("POST", "**/auth/validate*").as("loginRequest");

    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest");

    cy.get(".oxd-userdropdown-tab").click();
    cy.contains("Logout").click();

    cy.url().should("include", "/auth/login");
  });
});
