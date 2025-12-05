from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

# get orgs api test
def test_get_orgs():
    response = client.get("/orgs")
    assert response.status_code == 200
    assert isinstance(response.json(),list)

# get orgs-details test
def test_get_orgs_details():
    response = client.get("/orgs/details")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data,list)
    assert "id" in data[0]
    assert "credits" in data[0]
    assert "allotments" in data[0]

# get orgs credit
def test_get_org_credits_success():
    response = client.get("/orgs/1/credits")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == 1
    assert isinstance(data["credits"], int)
    assert isinstance(data["allotments"], list)

# post credit api 
def test_org_post_credit_success():
    payload = {"credits": 50}
    response = client.post("/org/1/credits", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "Successfully added 50 credits"
    assert data["org_id"] == 1
    assert isinstance(data["allotments"],list)
    assert data["allotments"][-1]["credits"] == 50

def test_org_post_credit_fail_not_found():
    payload = {"credits": 50}

    # org_id = 999 (not available in database)
    response = client.post("/org/999/credits", json=payload)

    assert response.status_code == 404
    data = response.json()
    assert data["detail"] == "Organization not found"