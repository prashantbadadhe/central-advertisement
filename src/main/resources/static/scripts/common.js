function setSidebarMenuSelection(selectedMenu) {
	removeSideMenu();
		$('.'+selectedMenu).addClass('active');
		$('#'+selectedMenu+'Selected').addClass('selected');
	}
function removeSideMenu() {
	if ($('div').hasClass('page-sidebar') == true) {
		$(".active").removeClass("active");
	}

}
