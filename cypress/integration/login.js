describe("login", () => {
  beforeEach(() => {
    cy.viewport(1200, 800);
  });

  it("Correct data in login", () => {
    cy.visit("/login");
    cy.get("#username-input").type("admin");
    cy.get("#password-input").type("1234");
    cy.get("form").submit();
    cy.url().should("eq", "http://localhost:4200/list");
    cy.window()
      .then((window) => window.sessionStorage.getItem("token"))
      .should(
        "eq",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4ifQ.jmAGPb7YzjEmHE4j47Iy3arOfqpRoQBL2eyXWZInt9w"
      );
    cy.get(".logout").click();
  });

  it("Incorrect data in login", () => {
    cy.visit("/login");
    cy.get("#username-input").type("admin");
    cy.get("#password-input").type("12345");
    cy.get("form").submit();
    cy.get("small").contains("Username or password is invalid");
    cy.url().should("eq", "http://localhost:4200/login");
  });

  it("Send empty form", () => {
    cy.visit("/login");
    cy.get("form").submit();
    cy.get("small").contains("Username is required");
    cy.get("small").contains("Password is required");
    cy.url().should("eq", "http://localhost:4200/login");
  });
});
