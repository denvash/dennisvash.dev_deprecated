import { URLS } from '@config';
import { SOCIALS } from '@constants';
import iconMapper from '@icons';
import { mixins, styled } from '@styles';
import React from 'react';
import { animated, useTrail } from 'react-spring';
import tw from 'twin.macro';

const Container = styled.div`
  ${mixins.flexCenter}
  ${tw`w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5`}
`;

const IconContainer = styled(animated.div)``;

const Item = styled(animated.a)`
  ${mixins.flexBetween}
  ${tw`flex-col cursor-pointer w-1/12 px-2`}

  svg {
    ${tw`w-full fill-current text-secondary
        duration-500 transition-transform ease-in-out transform hocus:text-primary
        hocus:-translate-y-1`};
  }
`;

const items = Object.values(SOCIALS).map(name => ({
  name,
  url: URLS[name],
  Icon: iconMapper[name],
}));

const spring = {
  delay: 5000,
  opacity: 1,
  x: 0,
  from: { opacity: 0, x: 20 },
};

const SocialBar = () => {
  const trail = useTrail(items.length, spring);

  return (
    <Container>
      {trail.map((spring, index) => {
        const { name, url, Icon } = items[index];

        return (
          <Item
            key={index}
            style={spring}
            href={url}
            target="_blank"
            rel="nofollow noopener noreferrer"
            aria-label={name}>
            <IconContainer>
              <Icon />
            </IconContainer>
          </Item>
        );
      })}
    </Container>
  );
};

SocialBar.SC = Container;

export default SocialBar;
