import styled from 'styled-components';
import theme from '../../config/theme';
import PlaceIcon from '@mui/icons-material/Place';

import Calander from '../UI/DatePicker';
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
import { Link } from 'react-router-dom';
import Editor from '../UI/Editor';
import CustomizedSwitches from '../UI/SwitchButton';
import Header from '../UI/Header';
import { LOCATION_CATEGORY } from '../../config/constants';

export const PostContainer = styled.div`
  width: 56rem;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  margin: 5rem auto;
  padding: 3rem;
  border: 1px solid #7c9299;
  border-radius: 1.2rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;
const TitleContainer = styled.div`
  align-items: center;
  height: 7rem;
`;
const Title = styled.input`
  font-size: ${theme.fontSizes.title};
  color: ${theme.colors.text};
  border: none;
  outline: none;
  height: 7rem;
  width: 53rem;
  margin-left: 1rem;
  border-bottom: 1px solid ${theme.colors.border};
  &::placeholder {
    color: ${theme.colors.textLightgray}
    font-size: ${theme.fontSizes.title};
  }
`;

const DividerLine = styled.div`
  width: 62rem;
  height: 0.009rem;
  background-color: ${theme.colors.border};
  position: absolute;
  left: 0;
`;

const ToolbarContainer = styled.div`
  display: flex;
  height: 7rem;
  align-items: center;
`;
const Location = styled.p``;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 29rem;
  margin: 0.4rem 1.2rem 1.2rem;
`;
const Content = styled.textarea`
  margin: auto;
  padding: 2rem;
  width: 49rem;
  height: 24rem;
  border: 1px solid #ccc;
  border-radius: 1.2rem;
  outline: none;
  overflow: hidden;
  resize: none;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text};

  &::placeholder {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: ${theme.fontSizes.medium};
    color: ${theme.colors.textLightgray};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const SubmitButton = styled.button`
  margin: auto;
  width: 16rem;
  font-size: ${theme.fontSizes.medium};
  color: ${(props) => props.color || `${theme.colors.textWhite}`};
  padding: 0.5rem;
  background-color: ${(props) =>
    props.backgroundColor || `${theme.colors.primary}`};
  border: 1px solid ${(props) => props.color || `${theme.colors.primary}`};
  font-weight: bold;
  border-radius: 12px;
  &:hover {
    filter: ${(props) =>
      props.backgroundColor === 'white' ? `` : 'brightness(1.15)'};
    background-color: ${(props) =>
      props.backgroundColor === 'white' ? `#ddd` : ''};
  }
`;

const BoardLink = styled(Link)`
  margin: auto;
`;

const StyledSelect = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4375em;
  letter-spacing: 0.00938em;
  color: ${theme.colors.text};
  box-sizing: border-box;
  margin: 12px;
  outline: none;
  &:hover {
    border: 1px solid ${theme.colors.text};
  }
`;

const ImgFile = styled.input`
  &::file-selector-button {
    width: 83.2px;
    padding-bottom: 15px;
    padding: 8px;
    background: ${theme.colors.textWhite};
    border: 1px solid #ccc;
    border-radius: 4px;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.4375em;
    letter-spacing: 0.00938em;
    color: ${theme.colors.text};
    box-sizing: border-box;
    margin: 12px;
    outline: none;
    &:hover {
      border: 1px solid ${theme.colors.text};
    }
  }
`;

function CommunityWrite() {
  return (
    <>
      <Header />
      <PostContainer>
        <TitleContainer>
          <Title type="text" placeholder="제목을 입력해주세요." />
          {/* <DividerLine style={{ top: '9rem' }} /> */}
        </TitleContainer>
        <ToolbarContainer>
          <StyledSelect>
            <option disabled hidden selected>
              <PlaceIcon /> 지역 선택
            </option>
            {LOCATION_CATEGORY.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </StyledSelect>
          <Calander />
          <ImgFile
            type="file"
            id="imgFile"
            name="imgFile"
            accept="image/png, image/jpeg"
          />
        </ToolbarContainer>
        {/* <DividerLine style={{ top: '15rem' }} /> */}
        <CustomizedSwitches />
        <ContentContainer>
          <Content
            cols="50"
            rows="10"
            placeholder="찾는(은) 물건의 위치, 장소와 날짜를 상세하게 적을 수록 찾을 수 있는 확률이 높아져요!"
          ></Content>
          {/* <Editor /> */}
        </ContentContainer>
        {/* <DividerLine style={{ top: '64rem' }} /> */}
        <ButtonContainer>
          <SubmitButton>등록</SubmitButton>
          <BoardLink to="/community/board">
            <SubmitButton backgroundColor="white" color="#7C9299">
              취소
            </SubmitButton>
          </BoardLink>
        </ButtonContainer>
      </PostContainer>
    </>
  );
}

export default CommunityWrite;