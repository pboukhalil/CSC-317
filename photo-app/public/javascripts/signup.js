$(document).ready(function(){
	$('#signup').click(function () {
		var fullname = $('#fullname').val();
		var email = $('#email').val();
		var password = $('#password').val();
		$.ajax({
			type:'post',
			url:'./users/signup',
			dataType:'JSON',
			data:{
				fullname:fullname,
				email:email,
				password:password
			},
			success:function(data){
				if (data && data.code === '1') {
					return alert(data.msg);
				}
				window.location.href = 'signin';
			}
		});
	});
});