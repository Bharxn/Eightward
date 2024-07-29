

function Learn() {
  return (
    <div className="learning-page">
      <div className="content-wrapper">
        <main>
          <h1 className="section-title">Learning</h1>
          <p className="section-description">
            การที่เราจะสามารถแต่งกลอนแปดได้ เราต้องรู้จักโครงสร้างและการสัมผัสของกลอนแปดก่อน โดยในส่วนนี้ผู้ใช้จะสามารถเรียนรู้โครงสร้าง
            <br />
            ของกลอนแปดเบื้องต้นได้
          </p>
          <h2 className="subsection-title">กลอนแปดคืออะไร?</h2>
          <p className="subsection-content">
            <strong>กลอนแปด</strong> คือ คำประพันธ์ประเภทร้อยกรองรูปแบบหนึ่ง หรือในอีกชื่อเรียกหนึ่งว่า กลอนสุภาพ ซึ่งกลอนแปดนั้นได้เป็นที่นิยมในหมู่คนทั่วไปเนื่องจากกลครงสร้างของกลอนนั้นมีความเรียบง่ายและสามารถ
            <br />
            สื่อความหมายออกมาได้อย่างไพเราะ กลอนแปดที่ได้รับความนิยมในปัจจุบันตัวอย่างเช่น กลอนแปดของสุนทรภู่
          </p>
          <h3 className="structure-title">โครงสร้างของกลอนแปด</h3>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2669b898f499f7a566aa6c1254e94131c5b57a3d5c5813336ae032d9b55faeb?apiKey=1269d6df3a164a94826caad2cac189c0&&apiKey=10bd3fe3b16f4141acce6d8681ddfa76" alt="โครงสร้างของกลอนแปด" className="structure-image" />
          <p className="structure-description">
            กลอนแปด 1 บทจะมี 2 บาท และ แต่ละบาทมี 2 วรรคโดยจะเรียกแต่ละวรรคว่า วรรคสดับ,รับ,รอง,ส่ง ตามลำดับ
          </p>
          <h3 className="rhyme-title">สัมผัสของกลอนแปด</h3>
          <p className="rhyme-description">
            คำสุดท้ายของวรรคที่ 1 จะสัมผัสกับคำที่ 3 เเละ 5 ของวรรคที่ 2<br />
            คำสุดท้ายของวรรคที่ 2 จะสัมผัสกับคำสุดท้ายของวรรคที่ 3 และคำที่ 3 ของวรรคที่ 4<br />
            คำสุดท้ายของวรรคที่ 4 จะสัมผัสกับคำสุดท้ายของวรรคที่ 2 ในบทถัดไป
          </p>
        </main>
      </div>
    </div>
  );
};

export default Learn;