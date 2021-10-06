import { Footer } from "./Footer";

const faq = () => {
  return (
    <>
      <div style={{ margin: "3rem" }}>
        <h2>Frequently Asked Questions</h2>
        <p
          style={{
            marginTop: "1rem",
            marginBottom: "0.5rem",
            marginRight: "1rem",
          }}
        ></p>
        <br />
        <p>
          <h4>How do I get my vaccination location added to Vaxx.nz?</h4>
          <p>
            We automatically load any locations listed on bookmyvaccine.nz, but
            if you're not integrated with them, contact Healthpoint to profile
            your missing location:{" "}
            <a href="https://www.healthpoint.co.nz/register/">
              https://www.healthpoint.co.nz/register/
            </a>
          </p>
          <br />
          <h4>Who maintains Vaxx.nz?</h4>
          <p>
            Vaxx.nz is an open source community project run by volunteers:{" "}
            <a href="https://github.com/CovidEngine/vaxxnz#built-by">
              https://github.com/CovidEngine/vaxxnz#built-by
            </a>
          </p>
          <br />
          <h4>How do I get involved?</h4>
          <p>
            Head over to{" "}
            <a href="https://github.com/CovidEngine/vaxxnz/blob/main/CONTRIBUTING.md">
              https://github.com/CovidEngine/vaxxnz/blob/main/CONTRIBUTING.md
            </a>
          </p>
          <br />
          <h4>How to add Vaxx.nz to my website?</h4>
          <p>
            Head over to{" "}
            <a href="https://docs.vaxx.nz/">https://docs.vaxx.nz/</a>
          </p>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default faq;
