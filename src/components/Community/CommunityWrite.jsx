import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LOCATION_CATEGORY, PRODUCT_CATEGORY } from '../../config/constants';
import styled from 'styled-components';
import theme from '../../config/theme';
import CustomizedSwitches from '../UI/SwitchButton';
import ImageInput from '../UI/ImageInput';
import { createNewEvent } from '../../api/http';
import useAuth from '../../hooks/useAuth';
import ErrorBlock from '../UI/ErrorBlock';
import CircularProgress from '@mui/material/CircularProgress';

const Background = styled.div`
  background-color: #eee;
  height: 100%;
  padding: 3px;
`;

export const PostContainer = styled.form`
  width: 56rem;
  height: 70%;
  display: flex;
  position: relative;
  flex-direction: column;
  margin: 5rem auto;
  padding: 3rem;
  background-color: white;
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
  // border-bottom: 1px solid ${theme.colors.border};
  &::placeholder {
    color: ${theme.colors.textLightgray}
    font-size: ${theme.fontSizes.title};
  }
`;

const ToolbarContainer = styled.div`
  display: flex;
  height: 7rem;
  align-items: center;
  justify-content: center;
`;

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
    props.$background || `${theme.colors.primary}`};
  border: 1px solid ${(props) => props.color || `${theme.colors.primary}`};
  font-weight: bold;
  border-radius: 12px;
  &:hover {
    filter: ${(props) =>
      props.$background === 'white' ? `` : 'brightness(1.15)'};
    background-color: ${(props) =>
      props.$background === 'white' ? `#ddd` : ''};
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
  margin-right: 12px;
  outline: none;
  &:hover {
    border: 1px solid ${theme.colors.text};
  }
`;

const CalInput = styled.input`
  padding: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-weight: 400;
  font-size: 1rem;
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 1.4375em;
  letter-spacing: 0.00938em;
  color: ${theme.colors.text};
  box-sizing: border-box;
  outline: none;
  &:hover {
    border: 1px solid ${theme.colors.text};
  }
`;

const GradationBox = styled.div`
  width: 54rem;
  height: 0.4rem;
  background: linear-gradient(135deg, #ffa500, #ff7f50, #ff6700);
  margin-left: 0.8rem;
  border-radius: 12px;
`;

function CommunityWrite() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [complete, setComplete] = useState(false);
  const [content, setContent] = useState('');
  const [nickname, setNickname] = useState('');
  const [boardCategory, setBoardCategory] = useState(0);
  const [picture, setPicture] = useState(null);
  const [productCategory, setProductCategory] = useState('');

  const { auth } = useAuth();

  // 이미지 파일 업로드
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setPicture(selectedFile);
  };
  // 완료 미완료 선택
  const handleSwitch = (isCompleted) => {
    setComplete(isCompleted);
  };
  // 게시판 카테고리 선택
  const urlLocation = useLocation();
  const searchParams = new URLSearchParams(urlLocation.search);
  const boardCategoryFromQuery = searchParams.get('board_category');

  useEffect(() => {
    if (boardCategoryFromQuery !== null) {
      setBoardCategory(Number(boardCategoryFromQuery));
    }
  }, [boardCategoryFromQuery]);

  const navigate = useNavigate();
  // react query로 데이터 수정
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => navigate('/community'),
  });
  // 게시판 작성 데이터 전송 formdata
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('board_category', boardCategory);
    formData.append('product_category', productCategory);
    formData.append('event_date', date);
    formData.append('event_location', location);
    formData.append('nickname', auth.nickname);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('isFound', complete);

    if (picture) {
      formData.append('picture', picture);
    }

    mutate(formData);
  }

  return (
    <Background>
      <PostContainer onSubmit={handleSubmit}>
        {isPending && <CircularProgress sx={{ color: '#ff6700' }} />}
        {!isPending && (
          <>
            <TitleContainer>
              <Title
                type="text"
                placeholder="제목을 입력해주세요."
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              <GradationBox />
            </TitleContainer>
            <ToolbarContainer>
              <StyledSelect
                value={productCategory}
                onChange={(event) => setProductCategory(event.target.value)}
              >
                {PRODUCT_CATEGORY.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </StyledSelect>
              <StyledSelect
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              >
                {LOCATION_CATEGORY.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </StyledSelect>
              <CalInput
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
              <ImageInput onChange={handleFileChange} />
            </ToolbarContainer>
            <CustomizedSwitches onChangeSwitch={handleSwitch} />
            <ContentContainer>
              <Content
                cols="50"
                rows="10"
                placeholder="찾는(은) 물건의 위치와 장소, 그리고 날짜를 상세하게 작성할수록 찾을 확률이 높아집니다!"
                value={content}
                onChange={(event) => setContent(event.target.value)}
              ></Content>
            </ContentContainer>
            <ButtonContainer>
              <SubmitButton type="submit">등록</SubmitButton>
              <BoardLink to="/community">
                <SubmitButton $background="white" color="#7C9299">
                  취소
                </SubmitButton>
              </BoardLink>
            </ButtonContainer>
          </>
        )}
      {isError && <ErrorBlock title='글 등록을 실패했습니다.' message={error.info?.message || '잠시후 다시 작성 부탁드립니다.'}/>}
      </PostContainer>
    </Background>
  );
}

export default CommunityWrite;
