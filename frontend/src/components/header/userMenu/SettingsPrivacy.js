export default function SettingsPrivacy({ setVisible }) {
  return (
    <div className="absolute_wrap">
      <div className="absolute_wrap_header">
        <div
          className="circle hover1"
          onClick={() => {
            setVisible(0);
          }}
        >
          <i className="arrow_back_icon"></i>
        </div>
        settings and privacy
      </div>
      <div className="mmenu_item hover3">
        <div className="small_cicle hover1">
          <i className="settings_filled_icon"></i>
        </div>
        <span> Settings</span>
      </div>
      <div className="mmenu_item hover3">
        <div className="small_cicle">
          <i className="privacy_checkup_icon"></i>
        </div>
        <span> Privacy Checkup</span>
      </div>
      <div className="mmenu_item hover3">
        <div className="small_cicle">
          <i className="privacy_shortcuts_icon"></i>
        </div>
        <span> Privacy ShortCuts</span>
      </div>
      <div className="mmenu_item hover3">
        <div className="small_cicle">
          <i className="news_icon"></i>
        </div>
        <span>News Feed Prefrences</span>
      </div>
      <div className="mmenu_item hover3">
        <div className="small_cicle">
          <i className="activity_log_icon"></i>
        </div>
        <span> Activity log</span>
      </div>
      <div className="mmenu_item hover3">
        <div className="small_cicle">
          <i className="language_icon"></i>
        </div>
        <span> Language</span>
      </div>
    </div>
  );
}
