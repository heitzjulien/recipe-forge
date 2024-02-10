.PHONY: dev

dev:
	@echo "Starting frontend..."
	cd frontend && yarn dev &
	@echo "Starting backend..."
	cd backend && yarn dev
