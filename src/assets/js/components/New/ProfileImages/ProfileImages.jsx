"use client";
import React, { useState } from 'react';

import styled from "styled-components";

const photos = [
  { id: 2, url: "/OFPPT.jpg?height=400&width=400", alt: "Photo 2" },
  { id: 1, url: "/OFPPT.jpg?height=400&width=400", alt: "Photo 1" },
  { id: 3, url: "/OFPPT.jpg?height=400&width=400", alt: "Photo 3" },
  { id: 4, url: "/OFPPT.jpg?height=400&width=400", alt: "Photo 4" },
  { id: 5, url: "/OFPPT.jpg?height=400&width=400", alt: "Photo 5" },
  { id: 6, url: "/OFPPT.jpg?height=400&width=400", alt: "Photo 6" },
];


const ProfileDiv = styled.div`
  height: 100%;
  flex: 1;
`;

const Banner = styled.div`
  position: relative;
  height: 240px;
  width: 100%;
  background: linear-gradient(135deg, #3b9dd1 0%, #91f8a4 100%);
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const BannerTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #333;
  background-color: white;
  padding: 15px 40px;
  border-radius: 8px;
  z-index: 2;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 2fr);
  gap: 16px;
  padding: 0 20px;
`;

const PhotoItem = styled.div`
width: 337.5px;
height: 224.86px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.02);
  }

  &:hover .overlay {
    opacity: 1;
  }

  &:hover .edit-icon {
    opacity: 1;
  }
`;

const PhotoOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.3s;
`;

const EditIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const PhotoImage = styled.img`
  width: 337.5px;
  height: 224.86px;
  object-fit: cover;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 20px 0;
  padding-top: 15px;
  border-top: 1px solid #eee;
  color: #888;
  font-size: 12px;
`;

const FooterLink = styled.a`
  color: #888;
  text-decoration: none;
  margin-right: 15px;

  &:hover {
    text-decoration: underline;
  }
`;

function ProfileImages() {
  return (
    <ProfileDiv>
      <Banner>
        <BannerTitle>Your Photos</BannerTitle>
      </Banner>

      <PhotoGrid>{photos.map((photo) => (
  <PhotoItem key={photo.id}>
    <PhotoImage src={photo.url || "/OFPPT.jpg"} alt={photo.alt} />
    
    <EditIcon className="edit-icon">
    <div className="edit-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </div>
          </EditIcon>
    
    <PhotoOverlay className="overlay">
      <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M7 10v12" />
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                </svg> 60</span>
      <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg> 30</span>
      <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="m22 4-10 12-10-12" />
                  <path d="M2 20h20" />
                </svg> 10</span>
    </PhotoOverlay>
  </PhotoItem>
))}
</PhotoGrid>

      <Footer>
        <div>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Use</FooterLink>
        </div>
        <div>Copyright 2025 ISGICONNECT. All Rights Reserved.</div>
      </Footer>
    </ProfileDiv>
  );
}

export default ProfileImages;


