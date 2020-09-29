import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";

import HeaderDash from "../../../components/headerDash/HeaderDash";
import Menu from "../../../components/menuEntrepreneur/Menu";
import MenuMobile from "../../../components/menuMobile/MenuMobile";

import api from "../../../services/api";
import { useAuth } from "../../../auth/auth";

import "./styles/styles.css";

//configura o tempo de duraçaõ do toast
toast.configure({
  autoClose: 3000,
  draggable: false,
});

export default function EntrepreneurProject() {
  const { user } = useAuth();

  const history = useHistory();

  if (!user) history.push("/");

  const [quiz, setQuiz] = useState([]);
  const [answered, setAnswered] = useState(0);
  const [answerDate, setAnswerDate] = useState("");
  const [inputName, setInputName] = useState([]);
  const [points, setPoints] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    api.get("admin/quiz").then((response) => {
      setQuiz(response.data);
    });
    api.get("users/profile").then((user) => {
      setAnswerDate(user.data.quizAnswerDate);
    });
  }, [loaded]);

  const now = (answered / quiz.length) * 100;

  const handleAnswerCounter = (name, point) => {
    setInputName(name);

    const checked = inputName.includes(name);

    if (checked) {
      points.forEach((item) =>
        item.pointData.name === name
          ? (item.pointData.point = point)
          : item.pointData.point
      );
    }
    if (!checked) {
      setAnswered(answered + 1);

      const data = {
        pointData: {
          name,
          point,
        },
      };
      setPoints([...points, data]);
    }
  };

  const handleAnswerQuiz = useCallback(async () => {
    try {
      let quizScore = 0;

      points.map(
        (data) => (quizScore = quizScore + Number(data.pointData.point))
      );

      await api.post("entrepreneurs/quiz", { quizScore: String(quizScore) });
      toast.success("Questionário respondido com sucesso");
      setLoaded(!loaded);
    } catch (error) {
      toast.error("Erro ao responder o questianário");
      console.log(error);
    }
  }, [points]);

  return (
    <>
      <MenuMobile />
      <div id="psicometricTest">
        <Menu />

        <div className="content">
          <HeaderDash alterLink="/entrepreneurData" />

          <div className="levels">
            <ProgressBar id="bar">
              <ProgressBar now={now} label={`${now.toFixed(2)}%`} />
            </ProgressBar>
          </div>
          <div
            className="quizContainer"
            style={{ border: answerDate ? "1px solid #e02041" : "none" }}
          >
            <div className="quizBox">
              {quiz.map((questionItem) => (
                <div className="quizQuestion" key={questionItem.question.id}>
                  <p>{questionItem.question.question}</p>
                  <div className="quizAnswers">
                    {questionItem.answers.map((answerItem) => (
                      <label key={answerItem.id} htmlFor={answerItem.id}>
                        {answerItem.answer}
                        <input
                          id={answerItem.id}
                          name={questionItem.question.id}
                          type="radio"
                          disabled={answerDate ? true : false}
                          className={answerDate ? "btnDisabled" : ""}
                          onChange={(e) =>
                            handleAnswerCounter(e.target.name, answerItem.point)
                          }
                        />
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleAnswerQuiz}
              disabled={answerDate ? true : false}
              className={answerDate ? "btnDisabled" : ""}
            >
              Responder questionário
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
