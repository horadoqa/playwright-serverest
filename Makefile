.PHONY: help api e2e api-users api-products e2e-users e2e-products all clean

# Comando base do Playwright
PW = npx playwright test

# ========================
# 🎯 MENU PRINCIPAL
# ========================
help:
	@clear
	@echo "====================================="
	@echo "        🚀 PLAYWRIGHT MENU"
	@echo "====================================="
	@echo ""
	@echo "1 - Rodar TODOS os testes"
	@echo "2 - Testes de API"
	@echo "3 - Testes E2E"
	@echo "4 - API - Users"
	@echo "5 - API - Products"
	@echo "6 - E2E - Users"
	@echo "7 - E2E - Products"
	@echo "0 - Sair"
	@echo ""
	@read -p "Escolha uma opção: " op; \
	case $$op in \
		1) make all ;; \
		2) make api ;; \
		3) make e2e ;; \
		4) make api-users ;; \
		5) make api-products ;; \
		6) make e2e-users ;; \
		7) make e2e-products ;; \
		0) exit 0 ;; \
		*) echo "❌ Opção inválida" ;; \
	esac

# ========================
# 🚀 EXECUÇÕES
# ========================

all:
	@echo "🔥 Rodando TODOS os testes..."
	@$(PW)

# ========================
# 🔌 API
# ========================

api:
	@echo "🔌 Rodando testes de API..."
	@$(PW) tests/api

api-users:
	@echo "👤 API - Users..."
	@$(PW) tests/api/users

api-products:
	@echo "📦 API - Products..."
	@$(PW) tests/api/products

# ========================
# 🌐 E2E
# ========================

e2e:
	@echo "🌐 Rodando testes E2E..."
	@$(PW) tests/e2e

e2e-users:
	@echo "👤 E2E - Users..."
	@$(PW) tests/e2e/users

e2e-products:
	@echo "📦 E2E - Products..."
	@$(PW) tests/e2e/products

# ========================
# REPORT
# ========================

report:
	@npx playwright show-report

# ========================
# DEBUG
# ========================

debug:
	@$(PW) --debug

# ========================
# 🧹 LIMPEZA
# ========================

clean:
	@echo "🧹 Limpando relatórios..."
	@rm -rf playwright-report
	@rm -rf test-results


# make api
# make e2e
# make api-users
# make e2e-products