import styled from "styled-components";

export const Container = styled.div`
  width: calc(100% - 350px);
  height: 100%;
  position: relative;
  display: inline-block;
`;

export const CalendarContainer = styled.div`
  width: 700px;
  height: 700px;
  /* position: absolute; */
  border: 1px solid black;
  margin: 0 auto;
  position: relative;
  top: 40px;
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
`;

export const CalendarTitle = styled.div`
  font-size: 50px;
  font-weight: 600;
  display: inline-block;
  text-align: center;
  width: 100%;
`;

export const LeftArrow = styled.span`
  font-size: 20px;
  font-weight: 600;
  float: left;
`;

export const RightArrow = styled(LeftArrow)`
  float: right;
`;

export const DaysContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

export const DayBox = styled.div`
  border: 1px solid black;
  display: inline-block;
  text-align: center;
  padding: 5px 0px;
  background: #ffe2b8ab;
  transition: all 0.2s;
  &:hover {
    background-color: #dddddd;
  }
`;

export const DateBox = styled.div`
  display: inline-block;
  height: 70px;
  position: relative;
  border: 1px solid black;
`;

export const DateText = styled.div<{ current: boolean }>`
  width: 25px;
  height: 25px;
  background-color: ${({ current }) => (current ? "tomato" : "default")};
  border-radius: 50%;
`;

export const SiderYearTitle = styled.div`
  display: inline-block;
  font-size: 79px;
  font-weight: 600;
  color: yellow;
  opacity: 0.8;
  margin-bottom: 10px;
`;

export const SideMonthTitle = styled.div`
  display: inline-block;
  font-size: 40px;
  font-weight: 600;
  color: yellow;
`;

export const SideDateTitle = styled.div`
  display: inline-block;
  font-size: 40px;
  font-weight: 600;
  color: yellow;
`;

export const SubmitBtn = styled.button`
  width: 15px;
  height: 15px;
`;
