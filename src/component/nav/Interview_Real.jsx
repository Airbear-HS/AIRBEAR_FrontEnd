import React, { useState } from 'react';
import axios from 'axios';
import './Interview_Real.css';

const questions = [
  '본인 스스로를 어떻게 표현하겠습니까?',
  '본인의 성격에 대해 얘기해 보세요.',
  '태어난 곳에 대해 얘기해 보세요.',
  '어렸을 때 어떤 아이였습니까?',
  '가장 친한 친구에 대해서 얘기해 보세요.',
  '보통 친구들과 무엇을 하나요?',
  '누구를 가장 존경하나요?',
  '가족에 대해 얘기해 보세요.',
  '사는 곳에 대해 말해보세요.',
  '집에서 가까운 장소들을 묘사해 보세요.',
  '이웃들과 얼마나 사이좋게 지내나요?',
  '사는 도시나 소도시에 대해 말해보세요.',
  '왜 본인의 학교를 선택하게 되었나요?',
  '학교에 대해 말해보세요.',
  '학교의 배경에 대해 조금 말해 보세요.',
  '어떻게 통학하나요?',
  '전공에 대해 말해보세요.',
  '본인의 학업 분야에 대해서 말해보세요.',
  '본인의 전공을 선택한 이유를 말해 보실래요?',
  '어떤 계기로 본인의 전공을 선택했나요?',
  '같은 과목 학생들에 대해 말해 보세요.',
  '좋아했던 과목에 대해 말해 보세요.',
  '교수님 중 한 분에 대해 말해 보세요.',
  '기억에 남는 수업에 대해 말해 보세요.',
  '소속되어 있던 동아리나 단체에 대해 말해 보세요.',
  '대학교 때 있었던 특별한 경험에 대해 말해 보세요.',
  '동아리나 단체에서 값진 경험을 얻었다고 생각하나요?',
  '대학교 때 강의실 밖에서 있었던 특별한 경험에 대해 말해 보세요.',
  '여가 시간에 무엇을 즐겨 하세요?',
  '특별한 취미가 있나요?',
  '마지막으로 ~한 ,,,이 무엇입니까?',
  '어디에서 외식하는 것을 좋아하나요?',
  '즐겨하는 스포츠에 대해 말해보세요.',
  '어떤 스포츠를 좋아하나요?',
  '체력 관리를 위해 무엇을 하나요?',
  '가장 좋아하는 스포츠의 어떤 부분이 좋나요?',
  '어떤 ~을 가장 좋아하나요?',
  '가장 좋아하지 않는 ~이 무엇인가요?',
  'A와 B 중 어떤 것이 좋나요?',
  '~을 하기 위해 찾는 곳이 어디인가요?',
  '기억에 남는 여행에 대해 말해 보세요.',
  '최근에 했던 여행에 대해 말해 보세요.',
  '흥미로웠던 여행에 대해 말해 보세요.',
  '가까운 미래에 어디로 여행 가고 싶나요?',
  '~에 대해 어떻게 생각하나요?',
  '~에 대해 말해 보세요.',
  '왜 ~ 한다고 생각하나요?',
  '당신 의견은요?',
  '이런 경우 ~은 무엇을 해야할까요?',
  '이 문제를 어떻게 해결하면 될까요?',
  '우린 ~이 있나요?',
  '일각에서는 ~라고 합니다. 어떻게 대답할 수 있나요?',
  '둘 중 어떤 것을 선호하나요?',
  '해외 근무를 하면 어떤 이점이 있을까요?',
  '해외근무의 부정적인 면은 어떤 것이 있을까요?',
  '둘 중 어떤 것이 더 유용하나요?',
  '어떤 면으로 본인의 전공이 승무원과 관련이 있나요?',
  '필요 시 다른 도시로 이주하는 것에 대해 문제가 있나요?',
  '이 항공사와 본인이 적합하다고 봅니까?',
  '무엇을 잘하나요?',
  '이 항공사의 무엇에 끌렸나요?',
  '왜 이 항공사에 지원했나요?',
  '우리 항공사가 어떤 면으로 본인에게 이득이 될 수 있나요?',
  '왜 이 항공사에 지원하는 건가요?',
  '다른 직무의 회사를 다닌 적이 있나요?',
  '있다면 그 직무에 어떤 업무가 수반되었나요?',
  '아르바이트 했던 경험이 있었다면 말해 보세요.',
  '어떤 사유로 이전 직장을 그만두었나요?',
  '가장 최근에 행한 선행은 무엇인가요?',
  '개인적 성취에 대해 말해 보세요.',
  '무언가를 성공시켰던 경험에 대해 얘기해 보세요.',
  '근래 행한 자랑스러운 일에 대해 말해 보시겠어요?',
  '실수를 저질렀던 때에 대해 말해 보세요.',
  '판단의 착오가 있었던 때에 대해 말해 보세요.',
  '실수로 배운 교훈에 대해 말해 보세요.',
  '인생의 좌우명이 무엇인가요?',
  '위기를 극복했을 때에 대해 말해 보세요.',
  '타인과 겪었던 갈등에 대해 말해 보세요.',
  '갈등을 처리했던 경험에 대해 말해 보세요.',
  '까다로운 동료를 다루는 데 가장 적합한 방법은 무엇일까요?',
  '당신의 강점은 무엇인가요?',
  '자신의 어떤 측면을 자랑스럽게 생각하나요?',
  '본인의 주요 단점은요?',
  '단점을 극복하기 위해 어떤 노력을 할 건가요?',
  '리더십을 발휘했을 때에 대해 말해 보세요.',
  '팀이나 그룹을 단결시켰던 경험에 대해 말해 보세요.',
  '예상치 못했던 리더 자리에 올랐던 때에 대해 말해 보세요.',
  '리더의 역할을 잘 수행했던 때에 대해 말해 보세요.',
  '가장 중요한 서비스는 무엇이라고 생각하나요?',
  '성공을 어떻게 정의하나요?',
  '승무원이 가져야할 신념은 무엇이라고 생각하나요?',
  '신념이 있나요?',
  '단기 목표가 있나요?',
  '장기 목표가 있나요?',
  '10년 후 본인은 무엇을 하고 있을까요?',
  '궁극적으로 본인의 진로는 어디쯤에 있을까요?',
  '본인의 일상적인 하루를 묘사해 보세요.',
  '오늘 어떻게 면접에 왔는지 말해 보세요.',
  '가능한 만큼 세부적으로 이상적인 하루를 묘사해 보세요.',
  '이 공간을 묘사해 보세요.',
  '무엇이 본인을 행복하게 해 주나요?',
  'A와 B의 차이점이 무엇인가요?',
  '이번 주말 무엇을 할 예정인가요?',
  '가장 좋아하는 명언에 대해 말해 보세요.',
  '사람들이 왜 산책을 할까요?',
  '일부 사람들은 왜 불법행위를 할까요?',
  '사람들이 왜 관계를 맺을까요?',
  '왜 세상에 종교가 있다고 생각하나요?',
  '비행 중 기내에서 승객이 갑자기 몸이 불편하다고 호소한다면 어떻게 대응하시겠습니까?',
  '항공기 지연으로 인해 승객들이 불만을 표출할 때 어떻게 상황을 수습하시겠습니까?',
  '탑승 수속 중 승객이 소지품을 잃어버렸다고 주장하면 어떻게 도와드리겠습니까?',
  '비행 중 두 승객이 서로 언쟁을 벌일 때 어떻게 중재하시겠습니까?',
  '죄송하지만, 질문을 다시 한 번 말씀해 주시겠습니까?',
  '조금 더 구체적으로 설명해 주실 수 있을까요?',
  '제가 이해한 것이 맞는지 확인하고 싶습니다. 다시 한 번 말씀해 주실 수 있나요?',
  '질문의 의미를 명확히 하고 싶습니다. 다시 한 번 설명해 주시겠어요?',
  '이 항공사에서 가장 중요하게 생각하는 서비스 철학은 무엇인가요?',
  '승무원으로서 성장하고 발전할 수 있는 기회는 어떤 것이 있나요?',
  '이 항공사에서 근무하는 동안 가장 도전적인 부분은 무엇인가요?',
  '현재 팀의 분위기나 항공사 문화는 어떤가요?',
];

const Interview_Real = () => {
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [recordButtonClicked, setRecordButtonClicked] = useState(false);
  const [audioSrc, setAudioSrc] = useState('');

  const toggleTextVisibility = () => {
    setIsTextVisible(!isTextVisible);
  };

  const toggleRecordButton = () => {
    setRecordButtonClicked(!recordButtonClicked);
  };

  const handleSynthesize = async (text) => {
    try {
      const response = await axios.post('/api/synthesize', { text });
      const audioContent = response.data.audioContent;
      setAudioSrc(`data:audio/mp3;base64,${audioContent}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTextClick = (text) => {
    handleSynthesize(text);
  };

  return (
    <div className="Personal">
      <div className="Personal-container">
        <div className="questions">
          <h2>Could you please tell me about your major?</h2>
        </div>

        <div className="answer-button" onClick={toggleTextVisibility}>
          {/* Answer Button SVG */}
        </div>

        {isTextVisible && (
          <div
            onClick={() =>
              handleTextClick('Could you please tell me about your major?')
            }
          >
            <p
              style={{
                color: '#000',
                fontFamily: 'Inter',
                fontSize: '20px',
                fontStyle: 'normal',
                fontWeight: 800,
                lineHeight: 'normal',
              }}
            >
              1. 제 전공은 영문학이고, 부전공은 관광경영학입니다.
              <br />
              2. 저는 화학 전공으로 올해 학사학위를 취득할 예정입니다.
              <br />
              3. 저는 디자인과 경영학 복수 전공으로 학사 학위를 가지고 있습니다.
              <br />
              4. 저는 2016년에 aa대학교에서 관광학 학사 학위를 취득했습니다.
              <br />
              5. 저는 항상 서비스 산업에서 일하기를 원했기 때문에 호텔경영학을
              전공했습니다.
            </p>
          </div>
        )}

        <div className="record_button" onClick={toggleRecordButton}>
          {recordButtonClicked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
            >
              <g clip-path="url(#clip0_412_9)">
                <path
                  d="M50 12.5C51.0206 12.5001 52.0056 12.8748 52.7682 13.553C53.5309 14.2311 54.0181 15.1656 54.1375 16.1792L54.1667 16.6667V83.3333C54.1655 84.3953 53.7588 85.4168 53.0298 86.189C52.3008 86.9613 51.3044 87.426 50.2442 87.4882C49.184 87.5504 48.1401 87.2055 47.3257 86.5239C46.5113 85.8423 45.9879 84.8754 45.8625 83.8208L45.8333 83.3333V16.6667C45.8333 15.5616 46.2723 14.5018 47.0537 13.7204C47.8351 12.939 48.8949 12.5 50 12.5ZM33.3333 25C34.4384 25 35.4982 25.439 36.2796 26.2204C37.061 27.0018 37.5 28.0616 37.5 29.1667V70.8333C37.5 71.9384 37.061 72.9982 36.2796 73.7796C35.4982 74.561 34.4384 75 33.3333 75C32.2283 75 31.1685 74.561 30.3871 73.7796C29.6057 72.9982 29.1667 71.9384 29.1667 70.8333V29.1667C29.1667 28.0616 29.6057 27.0018 30.3871 26.2204C31.1685 25.439 32.2283 25 33.3333 25ZM66.6667 25C67.7717 25 68.8315 25.439 69.6129 26.2204C70.3943 27.0018 70.8333 28.0616 70.8333 29.1667V70.8333C70.8333 71.9384 70.3943 72.9982 69.6129 73.7796C68.8315 74.561 67.7717 75 66.6667 75C65.5616 75 64.5018 74.561 63.7204 73.7796C62.939 72.9982 62.5 71.9384 62.5 70.8333V29.1667C62.5 28.0616 62.939 27.0018 63.7204 26.2204C64.5018 25.439 65.5616 25 66.6667 25ZM16.6667 37.5C17.7717 37.5 18.8315 37.939 19.6129 38.7204C20.3943 39.5018 20.8333 40.5616 20.8333 41.6667V58.3333C20.8333 59.4384 20.3943 60.4982 19.6129 61.2796C18.8315 62.061 17.7717 62.5 16.6667 62.5C15.5616 62.5 14.5018 62.061 13.7204 61.2796C12.939 60.4982 12.5 59.4384 12.5 58.3333V41.6667C12.5 40.5616 12.939 39.5018 13.7204 38.7204C14.5018 37.939 15.5616 37.5 16.6667 37.5ZM83.3333 37.5C84.3539 37.5001 85.3389 37.8748 86.1015 38.553C86.8642 39.2311 87.3514 40.1656 87.4708 41.1792L87.5 41.6667V58.3333C87.4988 59.3953 87.0922 60.4168 86.3631 61.189C85.6341 61.9613 84.6377 62.426 83.5775 62.4882C82.5173 62.5505 81.4734 62.2055 80.659 61.5239C79.8446 60.8423 79.3213 59.8754 79.1958 58.8208L79.1667 58.3333V41.6667C79.1667 40.5616 79.6056 39.5018 80.387 38.7204C81.1685 37.939 82.2283 37.5 83.3333 37.5Z"
                  fill="#00D8FF"
                />
              </g>
              <defs>
                <clipPath id="clip0_412_9">
                  <rect width="100" height="100" fill="white" />
                </clipPath>
              </defs>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
            >
              <path
                d="M30.3574 23.2143C30.3574 18.9518 32.0507 14.864 35.0646 11.85C38.0786 8.83606 42.1664 7.14282 46.4289 7.14282C50.6913 7.14282 54.7791 8.83606 57.7931 11.85C60.807 14.864 62.5003 18.9518 62.5003 23.2143V48.6571C60.5996 49.4878 58.8018 50.5365 57.1431 51.7821V23.2143C57.1431 20.3726 56.0143 17.6474 54.005 15.6381C51.9957 13.6288 49.2705 12.5 46.4289 12.5C43.5872 12.5 40.862 13.6288 38.8527 15.6381C36.8434 17.6474 35.7146 20.3726 35.7146 23.2143V51.7857C35.7142 53.3919 36.0751 54.9776 36.7703 56.4256C37.4656 57.8735 38.4775 59.1466 39.7312 60.1507C40.9849 61.1548 42.4484 61.8641 44.0132 62.2262C45.5781 62.5884 47.2044 62.594 48.7717 62.2428C47.965 64.0397 47.359 65.9202 46.9646 67.85L46.4289 67.8571C42.1664 67.8571 38.0786 66.1639 35.0646 63.1499C32.0507 60.1359 30.3574 56.0481 30.3574 51.7857V23.2143ZM46.486 75H46.4289C40.272 75 34.3674 72.5542 30.0139 68.2007C25.6603 63.8471 23.2146 57.9425 23.2146 51.7857V49.1071C23.2146 48.3967 22.9324 47.7154 22.43 47.2131C21.9277 46.7107 21.2464 46.4285 20.536 46.4285C19.8256 46.4285 19.1443 46.7107 18.642 47.2131C18.1396 47.7154 17.8574 48.3967 17.8574 49.1071V51.7857C17.8572 58.8997 20.511 65.758 25.2997 71.0189C30.0884 76.2799 36.6676 79.5652 43.7503 80.2321V90.1785C43.7503 90.8889 44.0325 91.5702 44.5348 92.0726C45.0371 92.5749 45.7184 92.8571 46.4289 92.8571C47.1393 92.8571 47.8206 92.5749 48.3229 92.0726C48.8252 91.5702 49.1074 90.8889 49.1074 90.1785V84.9035C47.6046 81.8018 46.7145 78.4391 46.486 75ZM73.2146 91.0714C68.4786 91.0714 63.9365 89.19 60.5877 85.8412C57.2388 82.4923 55.3574 77.9503 55.3574 73.2143C55.3574 68.4782 57.2388 63.9362 60.5877 60.5873C63.9365 57.2385 68.4786 55.3571 73.2146 55.3571C77.9506 55.3571 82.4926 57.2385 85.8415 60.5873C89.1903 63.9362 91.0717 68.4782 91.0717 73.2143C91.0717 77.9503 89.1903 82.4923 85.8415 85.8412C82.4926 89.19 77.9506 91.0714 73.2146 91.0714ZM73.2146 96.4285C79.3714 96.4285 85.276 93.9827 89.6295 89.6292C93.9831 85.2757 96.4288 79.3711 96.4288 73.2143C96.4288 67.0574 93.9831 61.1528 89.6295 56.7993C85.276 52.4457 79.3714 50 73.2146 50C67.0578 50 61.1531 52.4457 56.7996 56.7993C52.4461 61.1528 50.0003 67.0574 50.0003 73.2143C50.0003 79.3711 52.4461 85.2757 56.7996 89.6292C61.1531 93.9827 67.0578 96.4285 73.2146 96.4285ZM73.2146 85.7143C76.5298 85.7143 79.7092 84.3973 82.0534 82.0531C84.3976 79.7089 85.7146 76.5295 85.7146 73.2143C85.7146 69.899 84.3976 66.7196 82.0534 64.3754C79.7092 62.0312 76.5298 60.7143 73.2146 60.7143C69.8994 60.7143 66.7199 62.0312 64.3757 64.3754C62.0315 66.7196 60.7146 69.899 60.7146 73.2143C60.7146 76.5295 62.0315 79.7089 64.3757 82.0531C66.7199 84.3973 69.8994 85.7143 73.2146 85.7143Z"
                fill="#00D8FF"
              />
            </svg>
          )}
        </div>

        <div className="recordcheck_button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
          >
            <path
              d="M59.3753 49.9999C59.3753 48.066 60.1435 46.2114 61.511 44.8439C62.8785 43.4765 64.7331 42.7083 66.667 42.7083C68.6009 42.7083 70.4555 43.4765 71.823 44.8439C73.1904 46.2114 73.9587 48.066 73.9587 49.9999C73.9587 51.9338 73.1904 53.7885 71.823 55.1559C70.4555 56.5234 68.6009 57.2916 66.667 57.2916C64.7331 57.2916 62.8785 56.5234 61.511 55.1559C60.1435 53.7885 59.3753 51.9338 59.3753 49.9999ZM33.3337 57.2916C35.2675 57.2916 37.1222 56.5234 38.4896 55.1559C39.8571 53.7885 40.6253 51.9338 40.6253 49.9999C40.6253 48.066 39.8571 46.2114 38.4896 44.8439C37.1222 43.4765 35.2675 42.7083 33.3337 42.7083C31.3998 42.7083 29.5451 43.4765 28.1777 44.8439C26.8102 46.2114 26.042 48.066 26.042 49.9999C26.042 51.9338 26.8102 53.7885 28.1777 55.1559C29.5451 56.5234 31.3998 57.2916 33.3337 57.2916Z"
              fill="#00D8FF"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.433 14.4333C8.33301 20.5416 8.33301 30.3583 8.33301 49.9999C8.33301 69.6416 8.33301 79.4624 14.433 85.5624C20.5413 91.6666 30.358 91.6666 49.9997 91.6666C69.6413 91.6666 79.4622 91.6666 85.5622 85.5624C91.6663 79.4666 91.6663 69.6416 91.6663 49.9999C91.6663 30.3583 91.6663 20.5374 85.5622 14.4333C79.4663 8.33325 69.6413 8.33325 49.9997 8.33325C30.358 8.33325 20.5372 8.33325 14.433 14.4333ZM55.2538 57.2916C53.6348 54.7579 52.905 51.7574 53.1797 48.7631C53.4543 45.7688 54.7177 42.9511 56.7706 40.7542C58.8235 38.5573 61.5493 37.1061 64.5181 36.6295C67.4869 36.1528 70.5299 36.6778 73.1674 38.1217C75.8049 39.5656 77.8868 41.8462 79.0849 44.604C80.283 47.3618 80.5292 50.44 79.7847 53.3532C79.0401 56.2663 77.3471 58.8489 74.9727 60.6936C72.5982 62.5383 69.6773 63.5403 66.6705 63.5416H33.3288C30.322 63.5403 27.4011 62.5383 25.0267 60.6936C22.6522 58.8489 20.9593 56.2663 20.2147 53.3532C19.4701 50.44 19.7163 47.3618 20.9144 44.604C22.1126 41.8462 24.1945 39.5656 26.8319 38.1217C29.4694 36.6778 32.5124 36.1528 35.4812 36.6295C38.4501 37.1061 41.1758 38.5573 43.2287 40.7542C45.2817 42.9511 46.5451 45.7688 46.8197 48.7631C47.0943 51.7574 46.3646 54.7579 44.7455 57.2916H55.2538Z"
              fill="#00D8FF"
            />
          </svg>
        </div>
      </div>

      <div className="next_q_button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            d="M6.25 50C6.25 58.6529 8.81589 67.1115 13.6232 74.3062C18.4305 81.5008 25.2633 87.1084 33.2576 90.4197C41.2519 93.7311 50.0485 94.5975 58.5352 92.9094C67.0219 91.2213 74.8174 87.0545 80.9359 80.9359C87.0545 74.8174 91.2213 67.0219 92.9094 58.5352C94.5975 50.0485 93.7311 41.2519 90.4197 33.2576C87.1084 25.2633 81.5008 18.4305 74.3062 13.6232C67.1115 8.81589 58.6529 6.25 50 6.25C38.3968 6.25 27.2688 10.8594 19.0641 19.0641C10.8594 27.2688 6.25 38.3968 6.25 50ZM25 46.875H62.9687L45.5312 29.3531L50 25L75 50L50 75L45.5312 70.5406L62.9687 53.125H25V46.875Z"
            fill="#00D8FF"
          />
        </svg>
      </div>

      {audioSrc && <audio controls src={audioSrc} autoPlay />}
    </div>
  );
};

export default Interview_Real;
