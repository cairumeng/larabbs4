@extends('layouts.app')

@section('content')
<div id="notifications-index-page" data-notifications="{{json_encode($notifications)}}" />
@stop