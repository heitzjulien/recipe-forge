.PHONY: dev

dev:
	@echo "Starting frontend..."
	cd frontend && yarn dev &
	@echo "Starting backend..."
	cd backend && yarn dev

install:
	@echo "Install frontend..."
	cd frontend && yarn install &
	@echo "Install backend dependence"
	cd backend && yarn install