<?php
$cipher_qr = "";
 error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
if ($_SERVER['REQUEST_METHOD'] == "POST"){
	$cipher_qr = $_POST["response_qr"];

	//$key previously generated safely, ie: openssl_random_pseudo_bytes, key is annynoumas for developers and stors in php by any methods
	$key = "123";
	$plaintext = "'abdelrazek nageh mahmoud' + '123456789123456'+'95.44'+'key123456780'";
	$ivlen = openssl_cipher_iv_length($cipher="AES-128-CBC");
	$iv = openssl_random_pseudo_bytes($ivlen);
	$ciphertext_raw = openssl_encrypt($plaintext, $cipher, $key, $options=OPENSSL_RAW_DATA, $iv);
	$hmac = hash_hmac('sha256', $ciphertext_raw, $key, $as_binary=true);
	$ciphertext = base64_encode( $iv.$hmac.$ciphertext_raw );

	//decrypt later....
	$c = base64_decode($cipher_qr);
	$ivlen = openssl_cipher_iv_length($cipher="AES-128-CBC");
	$iv = substr($c, 0, $ivlen);
	$hmac = substr($c, $ivlen, $sha2len=32);
	$ciphertext_raw = substr($c, $ivlen+$sha2len);
	$original_plaintext = openssl_decrypt($ciphertext_raw, $cipher, $key, $options=OPENSSL_RAW_DATA, $iv);
	$calcmac = hash_hmac('sha256', $ciphertext_raw, $key, $as_binary=true);
	if (hash_equals($hmac, $calcmac))//PHP 5.6+ timing attack safe comparison
	{
		echo $original_plaintext;
	}
}
?>