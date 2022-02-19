import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  return (
    <div class="container--footer">
      <ul class="list-unstyled list-inline text-center">
        <li class="list-inline-item">
          <a
            class="btn-floating btn-fb mx-1"
            href="linkedin/in/lucía-bagnis"
            target="_blank"
          >
            <i>
              <FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon>{" "}
            </i>
          </a>
        </li>
        <li class="list-inline-item">
          <a class="btn-floating btn-tw mx-1">
            <i>
              {" "}
              <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
            </i>
          </a>
        </li>
      </ul>
      <h6 class="footer-copyright text-center py-3">© {year} Copyright:</h6>
    </div>
  );
}
