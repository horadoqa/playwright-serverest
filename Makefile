.PHONY: help setup check-setup all api e2e api-users api-products e2e-users e2e-products report debug clean

PW = npx playwright test
SETUP_MARKER = node_modules/.playwright-setup-complete

help:
	@echo "====================================="
	@echo "        PLAYWRIGHT MENU"
	@echo "====================================="
	@echo "1 - Setup do projeto"
	@echo "2 - Todos os testes"
	@echo "3 - Testes de API"
	@echo "4 - Testes E2E"
	@echo "5 - API Users"
	@echo "6 - API Products"
	@echo "7 - E2E Users"
	@echo "8 - E2E Products"
	@echo "9 - Relatorio"
	@echo "10 - Debug"
	@echo "0 - Sair"
	@read -p "Escolha uma opcao: " op; \
	case "$$op" in \
		1) $(MAKE) setup ;; \
		2) $(MAKE) all ;; \
		3) $(MAKE) api ;; \
		4) $(MAKE) e2e ;; \
		5) $(MAKE) api-users ;; \
		6) $(MAKE) api-products ;; \
		7) $(MAKE) e2e-users ;; \
		8) $(MAKE) e2e-products ;; \
		9) $(MAKE) report ;; \
		10) $(MAKE) debug ;; \
		0) exit 0 ;; \
		*) echo "Opcao invalida" ;; \
	esac

setup:
	npm install
	npx playwright install
	@mkdir -p node_modules
	@touch $(SETUP_MARKER)
	@echo "Setup concluido!"

check-setup:
	@test -x node_modules/.bin/playwright -a -f $(SETUP_MARKER) || \
		(echo "Execute primeiro: make setup"; exit 1)

all: check-setup
	$(PW)

api: check-setup
	$(PW) tests/api

api-users: check-setup
	$(PW) tests/api/users

api-products: check-setup
	$(PW) tests/api/products

e2e: check-setup
	$(PW) tests/e2e

e2e-users: check-setup
	$(PW) tests/e2e/users

e2e-products: check-setup
	$(PW) tests/e2e/products

report: check-setup
	npx playwright show-report

debug: check-setup
	$(PW) --debug

clean:
	rm -rf playwright-report test-results
	rm -f $(SETUP_MARKER)
