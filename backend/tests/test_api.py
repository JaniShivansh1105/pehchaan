from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "PEHCHAAN API"}

def test_get_user_not_found():
    response = client.get("/api/v1/users/non-existent-id")
    assert response.status_code == 404

def test_get_user_readiness_not_found():
    response = client.get("/api/v1/users/non-existent-id/readiness/latest")
    assert response.status_code == 404

def test_simulator_bounds():
    # Simulating a scenario should never exceed 900 or go below 300
    response = client.post(
        "/api/v1/users/demo-id/simulations", 
        json={"scenario_id": "custom", "inputs": {"custom_change": 9999}}
    )
    # Even if user doesn't exist, simulator defaults to base score 700
    assert response.status_code == 200
    data = response.json()
    assert data["projected_score"] <= 900
    
    response = client.post(
        "/api/v1/users/demo-id/simulations", 
        json={"scenario_id": "custom", "inputs": {"custom_change": -9999}}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["projected_score"] >= 300
