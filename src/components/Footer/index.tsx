import { FooterWrapper, FooterText } from "./styles";

export const Footer = () => {
  return (
    <FooterWrapper>
      <FooterText>
        © {new Date().getFullYear()} bryanalba.dev
      </FooterText>
    </FooterWrapper>
  );
};
