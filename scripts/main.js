$(document).ready(function () {
  const modalsNames = [".product", ".favourites", ".cart", ".search", ".profile", ".auth", ".register", ".contacts"];

  const closeModals = () => {
    modalsNames.forEach((name) => {
      const modal = $(`${name}Modal`);
      if (modal.hasClass("open")) {
        modal.addClass("closed");
        modal.removeClass("open");
      }
    });
  };

  const toggleModal = (name) => {
    const modal = $(`${name}Modal`);
    const isOpen = modal.hasClass("open");
    closeModals();
    if (isOpen) {
      modal.addClass("closed");
      modal.removeClass("open");
    } else {
      $(`${name}Modal input`).val("");
      modal.addClass("open");
      modal.removeClass("closed");
    }
  };

  modalsNames.forEach((name) => {
    $(name).click(() => {
      $(name).blur();
      toggleModal(name);
    });
  });

  $(".closeButton").click(() => {
    closeModals();
  });

  $(".search").click(() => {
    $(".searchModal > input[type='text']").focus();
  });

  $(".product > .imgWrapper").click(() => {
    $("body").toggleClass("noScroll");
  });

  $(".productModal .closeButtonWrapper > .closeButton").click(() => {
    $("body").toggleClass("noScroll");
  });

  $(".favouriteButton").click(function () {
    $(this).toggleClass("pressed");
  });
});
