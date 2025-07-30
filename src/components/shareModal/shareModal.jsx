import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";
import { useState } from "react";
import "./ShareModal.css";

const ShareModal = ({ url, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="share-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4>Share</h4>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="share-options">
          <button onClick={handleCopy}>
            <img src="/general/more.svg" alt="Copy link" />
            <span>{copied ? "Copied!" : "Copy link"}</span>
          </button>

          <WhatsappShareButton url={url}>
            <WhatsappIcon size={40} round />
            <span>WhatsApp</span>
          </WhatsappShareButton>

          <FacebookShareButton url={url}>
            <FacebookIcon size={40} round />
            <span>Facebook</span>
          </FacebookShareButton>

          <TwitterShareButton url={url}>
            <TwitterIcon size={40} round />
            <span>X</span>
          </TwitterShareButton>

          <EmailShareButton url={url}>
            <EmailIcon size={40} round />
            <span>Email</span>
          </EmailShareButton>
        </div>

        <input type="text" className="share-search" placeholder="Search by name or email address"  />
      </div>
    </div>
  );
};

export default ShareModal;
