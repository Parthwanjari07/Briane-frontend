from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pydantic import BaseModel
from typing import List, Optional
import os
import uuid
import datetime

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017/braine")
client = MongoClient(MONGO_URL)
db = client.braine

# Models
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class User(BaseModel):
    id: str
    name: str
    email: str
    created_at: datetime.datetime

class UserLogin(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class BrandProfile(BaseModel):
    brandName: str
    industry: str
    websiteUrl: str
    targetAudience: str
    monthlyAdSpend: str
    userId: str

class Competitor(BaseModel):
    id: str
    name: str
    website: str
    industry: str
    logo: Optional[str] = None
    description: Optional[str] = None

class CompetitorRecommendation(BaseModel):
    competitors: List[Competitor]

# Routes
@app.get("/api/healthcheck")
def healthcheck():
    return {"status": "ok", "version": "1.0.0"}

@app.post("/api/auth/signup")
def signup(user: UserCreate):
    # Check if user already exists
    existing_user = db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    user_id = str(uuid.uuid4())
    user_data = {
        "id": user_id,
        "name": user.name,
        "email": user.email,
        "password": user.password,  # In a real app, this would be hashed
        "created_at": datetime.datetime.now()
    }
    
    db.users.insert_one(user_data)
    
    # Return access token (simplified)
    return {
        "access_token": user_id,
        "token_type": "bearer"
    }

@app.post("/api/auth/login")
def login(user_login: UserLogin):
    # Find user
    user = db.users.find_one({"email": user_login.email})
    
    # Check if user exists and password matches
    if not user or user["password"] != user_login.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    # Return access token
    return {
        "access_token": user["id"],
        "token_type": "bearer"
    }

@app.post("/api/brand-profile")
def create_brand_profile(profile: BrandProfile):
    # Save brand profile
    profile_data = profile.dict()
    profile_data["id"] = str(uuid.uuid4())
    profile_data["created_at"] = datetime.datetime.now()
    
    db.brand_profiles.insert_one(profile_data)
    
    return {
        "id": profile_data["id"],
        "message": "Brand profile created successfully"
    }

@app.get("/api/competitors/recommendations")
def get_competitor_recommendations(industry: str):
    # Mock competitor recommendations based on industry
    competitors = []
    
    # Fashion & Apparel
    fashion_competitors = [
        {
            "id": str(uuid.uuid4()),
            "name": "Lululemon",
            "website": "https://lululemon.com",
            "industry": "Fashion & Apparel",
            "logo": "https://logo.clearbit.com/lululemon.com",
            "description": "Athletic apparel retailer with a focus on yoga-inspired items."
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Nike",
            "website": "https://nike.com",
            "industry": "Fashion & Apparel",
            "logo": "https://logo.clearbit.com/nike.com",
            "description": "Leading athletic apparel and footwear brand."
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Adidas",
            "website": "https://adidas.com",
            "industry": "Fashion & Apparel",
            "logo": "https://logo.clearbit.com/adidas.com",
            "description": "Global sportswear manufacturer."
        },
        {
            "id": str(uuid.uuid4()),
            "name": "H&M",
            "website": "https://hm.com",
            "industry": "Fashion & Apparel",
            "logo": "https://logo.clearbit.com/hm.com",
            "description": "Fast fashion retail company with affordable clothing."
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Zara",
            "website": "https://zara.com",
            "industry": "Fashion & Apparel",
            "logo": "https://logo.clearbit.com/zara.com",
            "description": "Spanish fashion retailer specializing in fast fashion."
        }
    ]
    
    # Beauty & Cosmetics
    beauty_competitors = [
        {
            "id": str(uuid.uuid4()),
            "name": "Sephora",
            "website": "https://sephora.com",
            "industry": "Beauty & Cosmetics",
            "logo": "https://logo.clearbit.com/sephora.com",
            "description": "Multinational chain of cosmetics stores."
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Ulta Beauty",
            "website": "https://ulta.com",
            "industry": "Beauty & Cosmetics",
            "logo": "https://logo.clearbit.com/ulta.com",
            "description": "Chain of beauty stores in the United States."
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Glossier",
            "website": "https://glossier.com",
            "industry": "Beauty & Cosmetics",
            "logo": "https://logo.clearbit.com/glossier.com",
            "description": "Direct-to-consumer beauty company."
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Fenty Beauty",
            "website": "https://fentybeauty.com",
            "industry": "Beauty & Cosmetics",
            "logo": "https://logo.clearbit.com/fentybeauty.com",
            "description": "Cosmetics brand founded by Rihanna."
        },
        {
            "id": str(uuid.uuid4()),
            "name": "The Ordinary",
            "website": "https://theordinary.com",
            "industry": "Beauty & Cosmetics",
            "logo": "https://logo.clearbit.com/theordinary.com",
            "description": "Skincare brand focusing on single-ingredient formulations."
        }
    ]
    
    # Health & Wellness
    health_competitors = [
        {
            "id": str(uuid.uuid4()),
            "name": "Peloton",
            "website": "https://onepeloton.com",
            "industry": "Health & Wellness",
            "logo": "https://logo.clearbit.com/onepeloton.com",
            "description": "Exercise equipment and media company."
        },
        {
            "id": str(uuid.uuid4()),
            "name": "MyFitnessPal",
            "website": "https://myfitnesspal.com",
            "industry": "Health & Wellness",
            "logo": "https://logo.clearbit.com/myfitnesspal.com",
            "description": "Smartphone app and website for tracking diet and exercise."
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Headspace",
            "website": "https://headspace.com",
            "industry": "Health & Wellness",
            "logo": "https://logo.clearbit.com/headspace.com",
            "description": "Online healthcare company specializing in meditation."
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Calm",
            "website": "https://calm.com",
            "industry": "Health & Wellness",
            "logo": "https://logo.clearbit.com/calm.com",
            "description": "Software company producing meditation products."
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Noom",
            "website": "https://noom.com",
            "industry": "Health & Wellness",
            "logo": "https://logo.clearbit.com/noom.com",
            "description": "Digital health platform focused on behavior change."
        }
    ]
    
    # Food & Beverage
    food_competitors = [
        {
            "id": str(uuid.uuid4()),
            "name": "Blue Apron",
            "website": "https://blueapron.com",
            "industry": "Food & Beverage",
            "logo": "https://logo.clearbit.com/blueapron.com",
            "description": "Meal kit delivery service."
        },
        {
            "id": str(uuid.uuid4()),
            "name": "HelloFresh",
            "website": "https://hellofresh.com",
            "industry": "Food & Beverage",
            "logo": "https://logo.clearbit.com/hellofresh.com",
            "description": "Meal-kit company that delivers pre-portioned ingredients."
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Daily Harvest",
            "website": "https://daily-harvest.com",
            "industry": "Food & Beverage",
            "logo": "https://logo.clearbit.com/daily-harvest.com",
            "description": "Subscription service delivering frozen smoothies, soups, and more."
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Soylent",
            "website": "https://soylent.com",
            "industry": "Food & Beverage",
            "logo": "https://logo.clearbit.com/soylent.com",
            "description": "Meal replacement drink manufacturer."
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Magic Spoon",
            "website": "https://magicspoon.com",
            "industry": "Food & Beverage",
            "logo": "https://logo.clearbit.com/magicspoon.com",
            "description": "Direct-to-consumer cereal brand with high protein and low sugar."
        }
    ]
    
    # Default competitors for other industries
    default_competitors = [
        {
            "id": str(uuid.uuid4()),
            "name": "Amazon",
            "website": "https://amazon.com",
            "industry": "E-commerce",
            "logo": "https://logo.clearbit.com/amazon.com",
            "description": "Global e-commerce giant."
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Target",
            "website": "https://target.com",
            "industry": "Retail",
            "logo": "https://logo.clearbit.com/target.com",
            "description": "General merchandise retailer."
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Walmart",
            "website": "https://walmart.com",
            "industry": "Retail",
            "logo": "https://logo.clearbit.com/walmart.com",
            "description": "Multinational retail corporation."
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Shopify",
            "website": "https://shopify.com",
            "industry": "E-commerce",
            "logo": "https://logo.clearbit.com/shopify.com",
            "description": "E-commerce platform for online stores."
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Etsy",
            "website": "https://etsy.com",
            "industry": "E-commerce",
            "logo": "https://logo.clearbit.com/etsy.com",
            "description": "E-commerce website focused on handmade or vintage items."
        }
    ]
    
    # Return competitors based on industry
    if industry == "Fashion & Apparel":
        competitors = fashion_competitors
    elif industry == "Beauty & Cosmetics":
        competitors = beauty_competitors
    elif industry == "Health & Wellness":
        competitors = health_competitors
    elif industry == "Food & Beverage":
        competitors = food_competitors
    else:
        competitors = default_competitors
    
    return {"competitors": competitors}

@app.on_event("startup")
async def startup_db_client():
    # Perform any startup tasks here
    pass

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
