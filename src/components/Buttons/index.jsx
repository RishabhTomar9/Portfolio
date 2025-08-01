import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <a
        href="https://drive.google.com/file/d/1jbqOROtleFOd6Qi-ASxT1arK_rqWliSL/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="Download-link"
      >
        <button className="Download-button">
          <svg xmlns="http://www.w3.org/2000/svg" height={16} width={20} viewBox="0 0 640 512">
            <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z" fill="white" />
          </svg>
          <span>Download CV</span>
        </button>
      </a>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .Download-link {
    text-decoration: none;
  }

  .Download-button {
    display: flex;
    align-items: center;
    font-family: inherit;
    font-weight: 500;
    font-size: 17px;
    padding: 12px 20px;
    color: white;
    background: rgb(103, 92, 156);
    border: none;
    letter-spacing: 0.05em;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  }

  .Download-button svg {
    margin-right: 8px;
    width: 25px;
  }

  .Download-button:hover {
    transform: scale(1.05); /* Scale the button slightly */
    background: rgb(88, 71, 116); /* Change background color */
  }

  .Download-button:active {
    transform: scale(0.95); /* Slightly shrink the button on click */
    box-shadow: 0 0.5em 1em -0.5em rgba(88, 71, 116, 0.627);
  }

  .Download-button::before {
    content: "";
    width: 4px;
    height: 40%;
    background-color: white;
    position: absolute;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    left: 0;
    transition: all 0.2s;
  }

  .Download-button::after {
    content: "";
    width: 4px;
    height: 40%;
    background-color: white;
    position: absolute;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    right: 0;
    transition: all 0.2s;
  }

  .Download-button:hover::before,
  .Download-button:hover::after {
    height: 60%;
  }

  .Download-button span {
    position: relative;
    z-index: 1;
    transition: color 0.3s ease;
  }

  .Download-button:hover span {
    color: #e0e0e0; /* Slightly lighten the text color on hover */
  }
`;

export default Button;