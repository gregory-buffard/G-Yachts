import {
  Body,
  Font,
  Head,
  Html,
  Button,
  Link,
  Img,
} from "@react-email/components";
import IContact from "@/types/contact";
import * as React from "react";

export default function Email(props: IContact) {
  const { data, received } = props;

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return `${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
  };

  return (
    <Html>
      <Head>
        <Font
          fontFamily={"Inter"}
          fallbackFontFamily={"sans-serif"}
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
            format: "woff2",
          }}
          fontStyle={"normal"}
        />
      </Head>
      <Body>
        {/*<main
          style={{
            width: "100%",
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <section
            style={{
              zIndex: "50",
              backgroundColor: "white",
              width: "48vh",
              border: "0.15vh solid #d4d4d4",
              borderRadius: "1vh",
              padding: "2vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "4vh",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 30 30"
                style={{
                  width: "2rem",
                  height: "2rem",
                  fill: "grey",
                  margin: "2vh",
                }}
              >
                <path d="M 15 3 C 11.686 3 9 5.686 9 9 L 9 10 C 9 13.314 11.686 16 15 16 C 18.314 16 21 13.314 21 10 L 21 9 C 21 5.686 18.314 3 15 3 z M 14.998047 19 C 10.992047 19 5.8520469 21.166844 4.3730469 23.089844 C 3.4590469 24.278844 4.329125 26 5.828125 26 L 24.169922 26 C 25.668922 26 26.539 24.278844 25.625 23.089844 C 24.146 21.167844 19.004047 19 14.998047 19 z"></path>
              </svg>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "start",
                  gap: "0.25vh",
                }}
              >
                <h1
                  style={{
                    fontWeight: "600",
                    fontSize: "1.125rem",
                    lineHeight: "1.75rem",
                    margin: "0",
                  }}
                >
                  New Message from {contact.name}
                </h1>
                <p
                  style={{
                    fontWeight: "400",
                    color: "grey",
                    fontSize: "0.875rem",
                    lineHeight: "1.25rem",
                    margin: "0",
                  }}
                >
                  {contact.email}
                </p>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                gap: "1vh",
              }}
            >
              <p
                style={{
                  fontWeight: "400",
                  color: "grey",
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  margin: "0",
                }}
              >
                {formatTimeAgo(new Date(contact.received))}
              </p>
              <p
                style={{
                  fontWeight: "400",
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  margin: "0",
                }}
              >
                {contact.message}
              </p>
            </div>
            <Button
              href={"https://www.g-yachts.com/admin"}
              style={{
                width: "100%",
                backgroundColor: "#0a0a0a",
                color: "white",
                fontWeight: "600",
                fontSize: "1rem",
                lineHeight: "1.5rem",
                borderRadius: "0.5vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "none",
              }}
            >
              <div
                style={{
                  width: "100%",
                  padding: "1vh",
                }}
              >
                View Message
              </div>
            </Button>
          </section>
        </main>*/}
        <table
          style={{
            width: "100%",
            height: "90vh",
            textAlign: "center",
          }}
        >
          <tbody>
            <tr>
              <td>
                <table
                  style={{
                    width: "512px",
                    backgroundColor: "white",
                    border: "1px solid #d4d4d4",
                    borderRadius: "10px",
                    padding: "20px",
                    textAlign: "left",
                    margin: "0 auto",
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          width: "100%",
                          paddingBottom: "20px",
                        }}
                      >
                        <table>
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  verticalAlign: "middle",
                                }}
                              >
                                <Img
                                  src="https://www.g-yachts.com/images/user.png"
                                  alt="User Icon"
                                  style={{
                                    width: "32px",
                                    height: "32px",
                                    fill: "grey",
                                    marginLeft: "20px",
                                    marginRight: "20px",
                                  }}
                                />
                              </td>
                              <td
                                style={{
                                  width: "100%",
                                }}
                              >
                                <div>
                                  <h1
                                    style={{
                                      fontWeight: "600",
                                      fontSize: "18px",
                                      lineHeight: "28px",
                                      margin: "0",
                                    }}
                                  >
                                    New Message from {data.name}
                                  </h1>
                                  <Link
                                    href={`mailto:${data.email}`}
                                    style={{
                                      fontWeight: "400",
                                      color: "grey",
                                      fontSize: "14px",
                                      lineHeight: "20px",
                                      margin: "0",
                                    }}
                                  >
                                    {data.email}
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          width: "100%",
                          paddingTop: "20px",
                          paddingBottom: "20px",
                        }}
                      >
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <p
                                  style={{
                                    fontWeight: "400",
                                    color: "grey",
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    margin: "0",
                                    marginBottom: "10px",
                                  }}
                                >
                                  {formatTimeAgo(received)}
                                </p>
                                <p
                                  style={{
                                    fontWeight: "400",
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    margin: "0",
                                  }}
                                >
                                  {data.message}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          width: "100%",
                          paddingTop: "20px",
                        }}
                      >
                        <table
                          style={{
                            width: "100%",
                          }}
                        >
                          <tbody>
                            <tr>
                              <td>
                                <Button
                                  href={"https://www.g-yachts.com/admin"}
                                  style={{
                                    width: "100%",
                                    backgroundColor: "#0a0a0a",
                                    color: "white",
                                    fontWeight: "600",
                                    borderRadius: "8px",
                                    textAlign: "center",
                                    border: "none",
                                  }}
                                >
                                  <p
                                    style={{
                                      fontWeight: "500",
                                      fontSize: "16px",
                                      lineHeight: "16px",
                                    }}
                                  >
                                    View Message
                                  </p>
                                </Button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </Body>
    </Html>
  );
}
