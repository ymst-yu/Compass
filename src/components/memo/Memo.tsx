import React from "react";
import { NowDate } from "../UIKit";
import MemoTitle from "./memoTitle/MemoTitle";
import MemoTextContainer from "./memoTextContainer/MemoTextContainer";
import MemoTimer from "./memoTimer/MemoTimer";
import MemoModal from "./memoModal/MemoModal";

const Memo: React.FC = () => {
  // メモの登録機能
  // 2つのモーダル(または画面の一部を切り替えるパターン)で処理する場合
  // 1つ目の画面
  // ・保存する  => Firestoreに登録　=> 2つ目の画面を表示
  // ・保存しない =>　2つ目の画面を表示
  // 2つ目の画面
  // ・続ける    =>　ページをリロードさせる
  // ・終了する  =>　mainに遷移させる

  return (
    <div>
      <div>
        <NowDate />
      </div>
      <div>
        <MemoTimer />
      </div>
      <div>
        <MemoTitle />
      </div>
      <div>
        <MemoTextContainer />
      </div>
      <div>
        <MemoModal />
      </div>
    </div>
  );
};

export default Memo;
