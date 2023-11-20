import React from 'react';
import styled, { css } from 'styled-components';
import theme from '../../config/theme';

const UserInfoContainer = styled.div`
  border-bottom: 1px solid ${theme.colors.textLightgray};
`;

const Label = styled.label`
  font-size: ${theme.fontSizes.large};
`;

const UserInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserEmail = styled.p`
  font-size: ${theme.fontSizes.medium};
`;

const EditInput = styled.input`
  width: 100%;
  padding: 1.6rem 0;
  font-size: ${theme.fontSizes.medium};
  outline: none;
  border: none;
`;

const EditButton = styled.button`
  width: 4.6rem;
  height: 2.6rem;
  border: 1px solid ${theme.colors.textLightgray};
  background-color: transparent;
  border-radius: 12px;
  font-size: ${theme.fontSizes.small};
  color: #252525;
  flex-shrink: 0;
  cursor: pointer;
  & + button {
    margin-left: 0.8rem;
  }
`;

export default function MyPageEmailInfoComponent({
  email,
  isEditMode,
  onEditMode,
  onConfirmClick,
  onCancelClick,
  onChange,
}) {
  return (
    <UserInfoContainer>
      <UserInfoBox>
        {!isEditMode && (
          <>
            <UserEmail>{email}</UserEmail>
            <EditButton onClick={onEditMode}>수정</EditButton>
          </>
        )}
        {isEditMode && (
          <>
            <EditInput
              type="text"
              id="email"
              value={email}
              onChange={onChange}
              maxLength="24"
            />
            <EditButton onClick={onConfirmClick}>확인</EditButton>
            <EditButton onClick={onCancelClick}>취소</EditButton>
          </>
        )}
      </UserInfoBox>
    </UserInfoContainer>
  );
}