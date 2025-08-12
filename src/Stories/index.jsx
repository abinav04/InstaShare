import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './index.css'

// Custom Arrow Components
const NextArrow = ({ onClick }) => (
  <div className="custom-arrow next" onClick={onClick}>
    <span className="arrow-icon">›</span>
  </div>
)

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow prev" onClick={onClick}>
    <span className="arrow-icon">‹</span>
  </div>
)

function Stories() {
  const [stories, setStories] = useState([])

  useEffect(() => {
    const getStories = async () => {
      const response = await fetch('https://apis.ccbp.in/insta-share/stories', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('jwt_token')}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setStories(data.users_stories || [])
      } else {
        console.error('Failed to fetch stories')
      }
    }
    getStories()
  }, [])

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false, // disable default arrows
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 6, slidesToScroll: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 4, slidesToScroll: 1 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 4, slidesToScroll: 1 }
      }
    ]
  }

  let sliderRef = null

  return (
    <div className="stories-wrapper">
      <div className="stories-container">
        <PrevArrow onClick={() => sliderRef?.slickPrev()} />
        <Slider {...settings} ref={(slider) => (sliderRef = slider)}>
          {stories.map((story) => (
            <div className="story-item" key={story.user_id}>
              <img
                src={story.story_url}
                alt={story.user_name}
                className="story-img"
              />
              <p className="story-name">{story.user_name}</p>
            </div>
          ))}
        </Slider>
        <NextArrow onClick={() => sliderRef?.slickNext()} />
      </div>
    </div>
  )
}

export default Stories
