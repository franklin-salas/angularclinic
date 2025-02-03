import * as Notiflix from 'notiflix';

export class NotiflixInit {
  static notiflixConfirmInit() {
    Notiflix.Confirm.init({
      className: 'notiflix-confirm',
      width: '300px',
      zindex: 4003,
      position: 'center', 
      distance: '10px',
      backgroundColor: '#f8f8f8',
      borderRadius: '25px',
      backOverlay: true,
      backOverlayColor: 'rgba(0,0,0,0.5)',
      rtl: false,
      fontFamily: 'Quicksand',
      cssAnimation: true,
      cssAnimationDuration: 300,
      cssAnimationStyle: 'fade', 
      plainText: true,

      titleColor: '#1976d2',
      titleFontSize: '16px',
      titleMaxLength: 34,

      messageColor: '#1e1e1e',
      messageFontSize: '14px',
      messageMaxLength: 110,

      buttonsFontSize: '15px',
      buttonsMaxLength: 34,
      okButtonColor: '#f8f8f8',
      okButtonBackground: '#1976d2',
      cancelButtonColor: '#f8f8f8',
      cancelButtonBackground: '#a9a9a9',
    });
  }

  static notiflixLoadingInit() {
    Notiflix.Loading.init({
      svgColor: '#1976d2',
      messageColor: '#1976d2',
    });
  }
}
