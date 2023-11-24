import styled from "styled-components";

const Wrapper = styled.section`
  padding: 2rem;

  background-color: rgba(1, 1, 1, 0.1);
  background-blend-mode: lighten;
  background-size: contain;
  background-position: center;

  .grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(3, 1fr);
  }

  .panel-card {
    font-family: "Comic Sans MS", cursive;
    background-color: ${({ theme }) => theme.colors.bg};
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
    border: 0.2rem solid ${({ theme }) => theme.colors.primary};

    &::before {
      content: "";
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      bottom: 0.5rem;
      left: 0.5rem;
      border: 0.2rem dashed ${({ theme }) => theme.colors.primary};
      z-index: -1;
    }

    textarea {
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 1rem;
      border: none;
      outline: none;
      background: none;
      resize: none;
      font-size: 1rem;
      font-family: "Comic Sans MS", cursive; /* Use a comic-style font */
      color: ${({ theme }) => theme.colors.text};
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: 1rem;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }
  }

  .generate-button {
    margin-top: 2rem;
    padding: 1rem 2rem;
    font-family: "Comic Sans MS", cursive;
    font-size: 1.5rem;
    background: linear-gradient(
      to right,
      #ff10ff,
      #ff10ff
    ); /* Gradient background */
    color: #fff;
    border: none;
    border-radius: 0.2rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: scale(1.1); /* Enlarge on hover */
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.8); /* White shadow for 3D effect */
    }

    &::before {
      /* Replace 'cartoon-icon.png' with your cartoon icon image */
      width: 40px; /* Adjust the size as needed */
      height: 40px;
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
    }

    &::after {
      font-size: 1rem;
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover::after {
      opacity: 1;
    }

    &:focus {
      outline: none;
    }
  }
  @media only screen and (max-width: 768px) {
    .grid {
      grid-template-columns: repeat(1, 1fr);
      gap: 1rem;
    }
  }
`;

export default Wrapper;
